import React, { useRef, useEffect } from "react";
import Message from "./Message";
import { Box } from "@chakra-ui/react";
import { useActiveChat } from "../../context/ActiveChatContext";
import { useUser } from "../../context/UserContext";
import axios from "axios";

function Messages({ messages, setMessages }) {
  const { user } = useUser();
  const { activeChat } = useActiveChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, [activeChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      if (!user) return;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/message/${activeChat._id}`,
        config
      );
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box maxHeight="59vh" overflow="auto">
      {messages?.map((message, index) => (
        <Message
          key={index}
          prevMessage={messages[index - 1]}
          message={message}
          isSenderMe={message.sender._id === user._id}
          isGroupChat={activeChat.isGroupChat}
        />
      ))}
      <div ref={bottomRef} />
    </Box>
  );
}

export default Messages;
