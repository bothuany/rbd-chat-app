import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { useChats } from "../../context/ChatsContext";

import { Box } from "@chakra-ui/react";

function Chats() {
  const { chats } = useChats();

  const [scroll, setScroll] = useState("none");

  useEffect(() => {
    if (chats.length > 7) {
      setScroll("scroll");
    } else {
      setScroll("none");
    }
  }, [chats]);

  return (
    <Box sx={{ overflowY: scroll, height: "83vh" }}>
      {chats?.map((chat, index) => (
        <Chat key={index} chat={chat}></Chat>
      ))}
    </Box>
  );
}

export default Chats;
