import {
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Lottie from "lottie-react";
import typingAnimation from "../../animations/typing.json";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useActiveChat } from "../../context/ActiveChatContext";
import { useChats } from "../../context/ChatsContext";
import axios from "axios";

function SendMessageForm({ messages, setMessages, socket, socketConnected }) {
  const [message, setMessage] = useState("");
  const { user } = useUser();
  const { activeChat } = useActiveChat();
  const { fetchChats } = useChats();
  const toast = useToast();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  function onChangeInput(event) {
    setMessage(event.target.value);

    if (!socketConnected) {
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", activeChat._id);
        setTyping(false);
      }
    }, timerLength);
  }

  useEffect(() => {
    if (user) {
      socket.on("typing", () => {
        setIsTyping(true);
      });
      socket.on("stop typing", () => {
        setIsTyping(false);
      });
    }
  }, [user]);
  const sendMessage = async () => {
    socket.emit("stop typing", activeChat._id);

    let messageToSend = message.trim();
    if (messageToSend.length === 0) {
      return;
    }
    try {
      if (!user) return;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/message",
        { content: messageToSend, chatId: activeChat._id },
        config
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);
      fetchChats();
    } catch (error) {
      toast({
        title: "Message failed to send",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        {isTyping ? (
          <Lottie
            animationData={typingAnimation}
            loop={true}
            style={{ width: 70, marginBottom: 4 }}
          />
        ) : (
          <></>
        )}
        <InputGroup>
          <Input
            placeholder="Write a message"
            value={message}
            onChange={onChangeInput}
            color="white"
            textDecoration="none"
          />
          <InputRightAddon cursor="pointer" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </InputRightAddon>
        </InputGroup>
      </FormControl>
    </form>
  );
}

export default SendMessageForm;
