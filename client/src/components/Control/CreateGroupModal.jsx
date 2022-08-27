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
import React, { useRef, useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useChats } from "../../context/ChatsContext";
import axios from "axios";
import { AddIcon, SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

function CreateGroupModal({ isOpen, onOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const { chats, setChats } = useChats();
  const [groupName, setGroupName] = useState("");

  const [membersToAdd, setMembersToAdd] = useState([]);
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

  const createGroup = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        { users: JSON.stringify(membersToAdd), name: groupName },
        config
      );
      setChats([...chats, data]);
      toast({
        title: "Success",
        description: "The group was successfully created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new group</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Group name</FormLabel>
            <Input
              onChange={onChangeInputGroupName}
              ref={initialRef}
              placeholder="Group name"
              value={groupName}
            />
          </FormControl>
          <Divider m={3} />
          <FormControl isRequired>
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
                ?.filter((user) =>
                  user.username
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase())
                )
                .filter((user) => !membersToAdd.includes(user))
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
                        setMembersToAdd([...membersToAdd, user]);
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
              {membersToAdd
                ?.filter((user) =>
                  user.username
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase())
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
                        setMembersToAdd(
                          membersToAdd.filter(
                            (member) => member.username !== user.username
                          )
                        );
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
              createGroup();
              onClose();
              setGroupName("");
              setMembersToAdd([]);
            }}
          >
            Create
          </Button>
          <Button
            onClick={() => {
              onClose();
              setGroupName("");
              setMembersToAdd([]);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateGroupModal;
