import React from "react";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { useActiveChat } from "../../context/ActiveChatContext";
import { useUser } from "../../context/UserContext";

function ChatHeader() {
  const { activeChat } = useActiveChat();
  const { user } = useUser();
  function getChatName(chat) {
    if (chat.isGroupChat) return chat.chatName;

    if (user) {
      if (chat.users[0]._id === user._id) return chat.users[1].username;
      if (chat.users[1]._id === user._id) return chat.users[0].username;
    }
  }
  const chatName = getChatName(activeChat);
  return (
    <Box backgroundColor="white" p="10px 5px" m="10px" borderRadius="md">
      <HStack d="flex">
        <Avatar name={chatName} />

        <Text fontWeight={600}>{chatName}</Text>
      </HStack>
    </Box>
  );
}

export default ChatHeader;
