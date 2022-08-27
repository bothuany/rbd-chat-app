import React, { useState } from "react";
import {
  Tooltip,
  Button,
  Text,
  useDisclosure,
  Input,
  HStack,
  Stack,
  InputGroup,
  InputLeftElement,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUsers,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import CreateGroupModal from "./CreateGroupModal";
import SearchModal from "./SearchModal";
import ProfileModal from "./ProfileModal";
function Navbar() {
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();
  const {
    isOpen: isCreateGroupOpen,
    onOpen: onCreateGroupOpen,
    onClose: onCreateGroupClose,
  } = useDisclosure();
  const {
    isOpen: isProfileInfoOpen,
    onOpen: onProfileInfoOpen,
    onClose: onProfileInfoClose,
  } = useDisclosure();

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");
  function onChangeInput(event) {
    setSearchKeyword(event.target.value);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  return (
    <>
      <HStack spacing={4} m="10px">
        <Text
          ml="3%"
          fontSize="4xl"
          fontFamily="Rubik Maze"
          color="white"
          width="30%"
        >
          RBD Chat App
        </Text>
        <InputGroup width="33%">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            color={"white"}
            onFocus={() => {
              onSearchOpen();
            }}
            onChange={onChangeInput}
            type="text"
            placeholder="Search User"
            value={searchKeyword}
          />

          <InputRightElement>
            {searchKeyword.length > 0 && (
              <IconButton
                height="80%"
                mr="5px"
                color="white"
                backgroundColor="rgb(26,32,44)"
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
        <Stack
          direction="row"
          spacing={4}
          width="33%"
          d="flex"
          justify="flex-end"
        >
          <Tooltip hasArrow label="Create a new group" aria-label="A tooltip">
            <Button
              colorScheme="whatsapp"
              variant="solid"
              onClick={onCreateGroupOpen}
            >
              <FontAwesomeIcon icon={faUsers} />
            </Button>
          </Tooltip>

          <Tooltip hasArrow label="Profile" aria-label="A tooltip">
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={onProfileInfoOpen}
            >
              <FontAwesomeIcon icon={faAddressCard} />
            </Button>
          </Tooltip>

          <Tooltip hasArrow label="Logout" aria-label="A tooltip">
            <Button colorScheme="red" variant="solid" onClick={logout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </Button>
          </Tooltip>
        </Stack>
      </HStack>

      <SearchModal
        isOpen={isSearchOpen}
        onOpen={onSearchOpen}
        onClose={onSearchClose}
        keyword={searchKeyword}
      />

      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onOpen={onCreateGroupOpen}
        onClose={onCreateGroupClose}
      />

      <ProfileModal
        isOpen={isProfileInfoOpen}
        onOpen={onProfileInfoOpen}
        onClose={onProfileInfoClose}
        user={user}
      />
    </>
  );
}

export default Navbar;
