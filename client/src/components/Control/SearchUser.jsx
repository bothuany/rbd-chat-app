import React from "react";
import { Avatar, Box, Text, HStack } from "@chakra-ui/react";
import { useUser } from "../../context/UserContext";
import { useChats } from "../../context/ChatsContext";
import { useActiveChat } from "../../context/ActiveChatContext";
import axios from "axios";

function SearchUser({ name, id }) {
  const { user } = useUser();
  const { chats, setChats } = useChats();
  const { setActiveChat } = useActiveChat();
  const accessChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId: id }, config);
      if (!chats.map((chat) => chat._id).includes(data._id)) {
        setChats([data, ...chats]);
      }
      setActiveChat(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      backgroundColor="rgb(237,242,247)"
      p="10px 5px"
      mt="3px"
      borderRadius="md"
      cursor="pointer"
      onClick={() => accessChat()}
    >
      <HStack d="flex" justify="space-between">
        <Avatar size="sm" name={name} />
        <Text fontWeight={500}>{name}</Text>
      </HStack>
    </Box>
  );
}

export default SearchUser;
