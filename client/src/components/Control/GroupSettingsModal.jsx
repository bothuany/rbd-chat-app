import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Tag,
  TagLabel,
  TagCloseButton,
  TagRightIcon,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useChats } from "../../context/ChatsContext";
import axios from "axios";
import { AddIcon, SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

function GroupSettingsModal({ isOpen, onClose, chat, members, setMembers }) {
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const { fetchChats } = useChats();
  const [groupName, setGroupName] = useState(chat.chatName);

  const toast = useToast();

  const [searchKeyword, setSearchKeyword] = useState("");

  function onChangeInputSearch(event) {
    setSearchKeyword(event.target.value);
  }
  function onChangeInputGroupName(event) {
    setGroupName(event.target.value);
  }
  const getUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/user", config);
      setUsers(data);
    } catch (error) {}
  };
  useEffect(() => {
    getUsers();
  }, [user]);

  const renameGroup = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(
        "/api/chat/group/rename",
        { chatId: chat._id, chatName: groupName },
        config
      );
      await fetchChats();
      toast({
        position: "top-right",
        title: "Renamed",
        status: "success",
        variant: "left-accent",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: "top-right",
        title: "Error",
        description: error.response.data.message,
        status: "error",
        variant: "left-accent",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const addMember = async (memberToAdd) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        "/api/chat/group/addmember",
        { chatId: chat._id, userId: memberToAdd._id },
        config
      );
      setMembers([...members, memberToAdd]);
      toast({
        position: "top-right",
        title: "Added",
        status: "success",
        variant: "left-accent",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: "top-right",
        title: "Error",
        description: error.response.data.message,
        variant: "left-accent",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const removeMember = async (memberToRemove) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        "/api/chat/group/removemember",
        { chatId: chat._id, userId: memberToRemove._id },
        config
      );
      setMembers(
        members.filter((member) => member.username !== memberToRemove.username)
      );

      toast({
        position: "top-right",
        title: "Removed",
        variant: "left-accent",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: "top-right",
        title: "Error",
        variant: "left-accent",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Rename</FormLabel>
            <Input
              onChange={onChangeInputGroupName}
              placeholder="Group name"
              value={groupName}
            />
          </FormControl>
          <Divider m={3} />
          <FormControl>
            <FormLabel>Users</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                onChange={onChangeInputSearch}
                type="text"
                placeholder="Search User"
                value={searchKeyword}
              />

              <InputRightElement>
                {searchKeyword.length > 0 && (
                  <IconButton
                    height="80%"
                    mr="5px"
                    color="black"
                    aria-label="Clear search box"
                    icon={<SmallCloseIcon />}
                    variant="unstyled"
                    onClick={() => {
                      setSearchKeyword("");
                    }}
                  />
                )}
              </InputRightElement>
            </InputGroup>

            <Box mt={5} d="flex" sx={{ overflowY: "scroll", height: "15vh" }}>
              {users
                ?.filter(
                  (user) =>
                    user.username
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase()) &&
                    !members.map((user) => user._id).includes(user._id)
                )
                .map((user, index) => (
                  <Tag
                    borderRadius="full"
                    variant="solid"
                    colorScheme="purple"
                    mr={1}
                    mt={1}
                    key={index}
                  >
                    <TagLabel>{user.username}</TagLabel>

                    <TagRightIcon
                      boxSize="12px"
                      as={AddIcon}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        addMember(user);
                      }}
                    />
                  </Tag>
                ))}
            </Box>
          </FormControl>
          <Divider m={3} />
          <FormControl>
            <FormLabel>Group Members</FormLabel>

            <Box mt={5} d="flex" sx={{ overflowY: "scroll", height: "15vh" }}>
              {user &&
                members
                  ?.filter(
                    (member) =>
                      member.username
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase()) &&
                      member.username !== user.username
                  )
                  .map((user, index) => (
                    <Tag
                      borderRadius="full"
                      variant="solid"
                      colorScheme="red"
                      mr={1}
                      mt={1}
                      key={index}
                    >
                      <TagLabel>{user.username}</TagLabel>
                      <TagCloseButton
                        onClick={() => {
                          removeMember(user);
                        }}
                      />
                    </Tag>
                  ))}
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              renameGroup();
              onClose();
            }}
          >
            Rename
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GroupSettingsModal;
