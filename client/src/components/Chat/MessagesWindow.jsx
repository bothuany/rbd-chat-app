import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import { Box, Center, Heading, Stack, useToast } from "@chakra-ui/react";
import ChatHeader from "./ChatHeader";
import SendMessageForm from "../Control/SendMessageForm";
import { useActiveChat } from "../../context/ActiveChatContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserContext";
import { useChats } from "../../context/ChatsContext";
import { useNotifications } from "../../context/NotificationsContext";
import io from "socket.io-client";

const ENDPOINT = "https://rbd-chat-app.herokuapp.com/";
let socket, activeChatCompare;

function MessagesWindow() {
  const { user } = useUser();
  const { activeChat } = useActiveChat();
  const { fetchChats } = useChats();
  const { notifications, setNotifications } = useNotifications();
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [prevActiveChatId, setPrevActiveChatId] = useState(null);
  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", () => {
        setSocketConnected(true);
      });
    }
  }, [user]);

  useEffect(() => {
    if (activeChat._id !== -1) {
      socket.emit("join chat", activeChat._id);
      setPrevActiveChatId(activeChat._id);
    }

    if (prevActiveChatId && prevActiveChatId !== -1) {
      socket.emit("leave chat", prevActiveChatId);
    }

    activeChatCompare = activeChat;
  }, [activeChat]);

  useEffect(() => {
    if (socket) {
      socket.on("message received", (newMessage) => {
        if (
          !activeChatCompare ||
          activeChatCompare._id !== newMessage.chat._id
        ) {
          setNotifications([...notifications, newMessage]);
        } else {
          setMessages([...messages, newMessage]);
        }
        fetchChats();
      });
    }
  });

  useEffect(() => {
    if (notifications.length > 0) {
      const message = notifications[notifications.length - 1];

      if (message.chat.isGroupChat) {
        toast({
          title: message.chat.chatName,
          description: message.sender.username + ": " + message.content,
          status: "info",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: message.sender.username,
          description: message.content,
          status: "info",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [notifications]);
  if (activeChat._id === -1)
    return (
      <Stack d="flex" justifyContent="center" h="100%" w="100%">
        <Center>
          <FontAwesomeIcon icon={faMessage} size="10x" color="white" />
        </Center>
        <Center>
          <Heading color="whiteAlpha.800">Let's start chatting</Heading>
        </Center>
      </Stack>
    );
  else
    return (
      <Stack display="flex" justifyContent="space-between" h="100%" w="100%">
        <Box>
          <ChatHeader />
          <Messages messages={messages} setMessages={setMessages} />
        </Box>

        <SendMessageForm
          messages={messages}
          setMessages={setMessages}
          socket={socket}
          socketConnected={socketConnected}
        />
      </Stack>
    );
}

export default MessagesWindow;
