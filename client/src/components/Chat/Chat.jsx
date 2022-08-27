import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import GroupModals from "../Control/GroupModals";
import { useActiveChat } from "../../context/ActiveChatContext";
import { useChats } from "../../context/ChatsContext";

function Chat({ chat }) {
  const { user } = useUser();
  const { activeChat, setActiveChat } = useActiveChat();
  const { chats } = useChats();
  const {
    isOpen: isGroupSettingsOpen,
    onOpen: onGroupSettingsOpen,
    onClose: onGroupSettingsClose,
  } = useDisclosure();
  const {
    isOpen: isGroupInfoOpen,
    onOpen: onGroupInfoOpen,
    onClose: onGroupInfoClose,
  } = useDisclosure();

  const [isActive, setIsActive] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("rgb(237,242,247)");

  useEffect(() => {
    if (activeChat) {
      setIsActive(activeChat._id === chat._id);
    }
  }, [activeChat, chats]);

  useEffect(() => {
    setBackgroundColor(isActive ? "rgb(179,185,180)" : "rgb(237,242,247)");
  }, [isActive]);

  function getChatName(chat) {
    if (chat.isGroupChat) return chat.chatName;

    if (user) {
      if (chat.users[0]._id === user._id) return chat.users[1].username;
      if (chat.users[1]._id === user._id) return chat.users[0].username;
    }
  }
  function getSenderName(message) {
    if (message.sender._id === user._id) return "You";
    return message.sender.username;
  }

  const chatName = getChatName(chat);
  return (
    <>
      <Box
        backgroundColor={backgroundColor}
        p="10px 5px"
        m="10px"
        borderRadius="md"
        cursor="pointer"
        id="chat"
        onClick={() => setActiveChat(chat)}
      >
        <HStack d="flex" justify="space-between">
          <HStack>
            <Avatar name={chatName} />
            <VStack d="flex" alignItems="baseline">
              <Text fontWeight={600}>{chatName}</Text>

              <Text>
                <Box as="span" fontWeight={500}>
                  {chat.latestMessage &&
                    getSenderName(chat.latestMessage) + ": "}
                </Box>
                {chat.latestMessage && chat.latestMessage.content.slice(0, 20)}
                {chat.latestMessage &&
                  chat.latestMessage.content.length > 20 &&
                  "..."}
              </Text>
            </VStack>
          </HStack>
          <HStack>
            {user && chat.isGroupChat && (
              <Tooltip
                hasArrow
                label="Group Information"
                aria-label="A tooltip"
              >
                <Button
                  size="sm"
                  onClick={(event) => {
                    onGroupInfoOpen();
                    event.stopPropagation();
                  }}
                  backgroundColor={backgroundColor}
                  variant="unstyled"
                >
                  <FontAwesomeIcon icon={faUserGroup} />
                </Button>
              </Tooltip>
            )}
            {user &&
              (chat.groupAdmin ? chat.groupAdmin._id === user._id : false) && (
                <Tooltip hasArrow label="Group Settings" aria-label="A tooltip">
                  <Button
                    size="sm"
                    onClick={(event) => {
                      onGroupSettingsOpen();
                      event.stopPropagation();
                    }}
                    backgroundColor={backgroundColor}
                    variant="unstyled"
                  >
                    <FontAwesomeIcon icon={faUsersGear} />
                  </Button>
                </Tooltip>
              )}
          </HStack>
        </HStack>
      </Box>
      <GroupModals
        isGroupSettingsOpen={isGroupSettingsOpen}
        onGroupSettingsOpen={onGroupSettingsOpen}
        onGroupSettingsClose={onGroupSettingsClose}
        isGroupInfoOpen={isGroupInfoOpen}
        onGroupInfoOpen={onGroupInfoOpen}
        onGroupInfoClose={onGroupInfoClose}
        chat={chat}
      />
    </>
  );
}

export default Chat;
