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
  Text,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";

function GroupInformationModal({ isOpen, onClose, chat, members }) {
  const [groupName] = useState(chat.chatName);

  const [searchKeyword, setSearchKeyword] = useState("");

  function onChangeInputSearch(event) {
    setSearchKeyword(event.target.value);
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Group Name</FormLabel>
            <Text>{groupName}</Text>
          </FormControl>
          <Divider m={3} />
          <FormControl>
            <FormLabel>Members ({members.length})</FormLabel>
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
              {chat.groupAdmin && (
                <Tag mr={1} mt={1} colorScheme="telegram" borderRadius="full">
                  <FontAwesomeIcon color="gold" icon={faCrown} />
                  <TagLabel ml={1}>{chat.groupAdmin.username}</TagLabel>
                </Tag>
              )}
              {chat.groupAdmin &&
                members
                  ?.filter(
                    (user) =>
                      user._id !== chat.groupAdmin._id &&
                      user.username
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())
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
                    </Tag>
                  ))}
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Exit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GroupInformationModal;
