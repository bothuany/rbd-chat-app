import React, { useState } from "react";
import Field from "./Field";
import { VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (email) setEmailError("");

    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (username) setUsernameError("");

    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (password) setPasswordError("");

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      return;
    }
    if (confirmPassword) setConfirmPasswordError("");

    if (password !== confirmPassword) {
      setConfirmPasswordError(
        "Password and confirmation password do not match"
      );
      toast({
        title: "Failed to register",
        description: "Password and confirmation password do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/user/register",
        { username, email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (error.response.data.message.includes("email")) {
        setEmailError(error.response.data.message);
      } else if (error.response.data.message.includes("username")) {
        setUsernameError(error.response.data.message);
      } else {
        setPasswordError(error.response.data.message);
      }
      toast({
        title: "Failed to register",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };
  return (
    <VStack spacing="20px">
      <Field
        name="Email"
        error={emailError}
        type="email"
        input={email}
        setInput={setEmail}
      />
      <Field
        name="Username"
        error={usernameError}
        type="text"
        input={username}
        setInput={setUsername}
      />
      <Field
        name="Password"
        error={passwordError}
        type="password"
        input={password}
        setInput={setPassword}
      />
      <Field
        name="Confirm Password"
        error={confirmPasswordError}
        type="password"
        input={confirmPassword}
        setInput={setConfirmPassword}
      />
      <Button
        width="100%"
        isLoading={isLoading}
        colorScheme="telegram"
        variant="solid"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;
