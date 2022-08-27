import React, { useState } from "react";
import Field from "./Field";
import { VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (email) setEmailError("");

    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (password) setPasswordError("");
    setIsLoading(true);
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
      toast({
        title: "Logged in",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      if (error.response.data.message.includes("email")) {
        setEmailError(error.response.data.message);
      } else {
        setPasswordError(error.response.data.message);
      }
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
        name="Password"
        error={passwordError}
        type="password"
        input={password}
        setInput={setPassword}
      />
      <Button
        width="100%"
        isLoading={isLoading}
        colorScheme="telegram"
        variant="solid"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
