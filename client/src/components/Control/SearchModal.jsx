import { Modal, ModalBody, ModalContent } from "@chakra-ui/react";
import React from "react";
import SearchUsers from "./SearchUsers";

function SearchModal({ isOpen, onClose, keyword }) {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      trapFocus={false}
      scrollBehavior="inside"
    >
      <ModalContent maxHeight="50%">
        <ModalBody>
          <SearchUsers keyword={keyword} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SearchModal;
