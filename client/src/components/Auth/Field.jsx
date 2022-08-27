import React from "react";
import {
  FormLabel,
  FormErrorMessage,
  Input,
  FormControl,
} from "@chakra-ui/react";

function Field({ name, error, type, input, setInput }) {
  const handleInputChange = (e) => setInput(e.target.value);

  const isError = error !== "";
  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{name}</FormLabel>
      <Input type={type} value={input} onChange={handleInputChange} />
      {isError && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default Field;
