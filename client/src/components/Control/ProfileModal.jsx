import React from "react";
import {
  Avatar,
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
function ProfileModal({ isOpen, onClose, user }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box
            backgroundColor="rgb(237,242,247)"
            p="10px 5px"
            mt="3px"
            borderRadius="md"
          >
            {user && (
              <HStack d="flex" justify="space-between">
                <Avatar name={user.username} />
                <VStack>
                  <Text>Username: {user.username}</Text>
                  <Text>Email: {user.email}</Text>
                </VStack>
              </HStack>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ProfileModal;
