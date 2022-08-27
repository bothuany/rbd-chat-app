import React from "react";
import {
  Avatar,
  Box,
  HStack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
} from "@chakra-ui/react";

function Message({ prevMessage, message, isSenderMe, isGroupChat }) {
  const createdAt = new Date(message.createdAt);
  const clock = createdAt.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = formatDate(createdAt);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  if (isSenderMe)
    return (
      <HStack d="flex" justifyContent="space-between" mt={1} mr={3}>
        <Box />

        <Tooltip
          label={date}
          aria-label="date"
          bg="rgb(196, 193, 220)"
          color="rgb(96, 94, 112)"
        >
          <Box
            backgroundColor="rgb(0,132,255)"
            borderRadius="5px"
            p={2}
            maxWidth={700}
          >
            <HStack d="flex" justifyContent="space-between">
              <Text color="white">{message.content}</Text>

              <Text fontWeight={400} fontSize="xs" whiteSpace="nowrap">
                {clock}
              </Text>
            </HStack>
          </Box>
        </Tooltip>
      </HStack>
    );
  else {
    if (isGroupChat)
      return (
        <HStack d="flex" justifyContent="space-between" mt={1} ml={3}>
          <Box>
            {((prevMessage && prevMessage.sender._id !== message.sender._id) ||
              !prevMessage) && (
              <Tag
                size="xs"
                variant="subtle"
                colorScheme="gray"
                borderRadius="full"
                mt={2}
                mb={1}
                p={0.5}
              >
                <Avatar size="xs" name={message.sender.username} />
                <TagLabel>{message.sender.username}</TagLabel>
              </Tag>
            )}

            <Tooltip
              label={date}
              aria-label="date"
              bg="rgb(196, 193, 220)"
              color="rgb(96, 94, 112)"
            >
              <Box
                backgroundColor="rgb(101,103,107)"
                borderRadius="full"
                p={2}
                maxWidth={700}
              >
                <HStack d="flex" justifyContent="space-between">
                  <Text color="white">{message.content}</Text>

                  <Text fontWeight={400} fontSize="xs" whiteSpace="nowrap">
                    {clock}
                  </Text>
                </HStack>
              </Box>
            </Tooltip>
          </Box>

          <Box />
        </HStack>
      );
    else
      return (
        <HStack d="flex" justifyContent="space-between" mt={1} ml={3}>
          <Tooltip
            label={date}
            aria-label="date"
            bg="rgb(196, 193, 220)"
            color="rgb(96, 94, 112)"
          >
            <Box
              backgroundColor="rgb(101,103,107)"
              borderRadius="full"
              p={2}
              maxWidth={700}
            >
              <HStack d="flex" justifyContent="space-between">
                <Text color="white">{message.content}</Text>

                <Text fontWeight={400} fontSize="xs" whiteSpace="nowrap">
                  {clock}
                </Text>
              </HStack>
            </Box>
          </Tooltip>

          <Box />
        </HStack>
      );
  }
}

export default Message;
