import {
  Button,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const submitedFunc = async () => {
    try {
      const request = await fetch(`http://localhost:5005/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await request.json();

      if (request.status !== 201) {
        toast({
          title: data.message,
          position: "top",
          duration: 3000,
          status: "error",
        });
        return;
      }
      toast({
        title: data.message,
        position: "top",
        duration: 3000,
        status: "success",
      });
      localStorage.setItem(`token`, data.token);
      navigate(`/`);
    } catch (error) {
      toast({
        title: "server Error !",
        position: "top",
        duration: 3000,
        status: "error",
      });
    }
  };

  return (
    <VStack
      color="whitesmoke"
      h="100vh"
      bg="gray.300"
      justify="center"
      align="center"
    >
      <VStack
        bg={"#2b2d42"}
        justify="center"
        p="6"
        w={["45vw", "55vw", "30vw"]}
        h="50vh"
        borderRadius="10"
      >
        <Text
          fontWeight="700"
          fontFamily="verdana"
          fontSize="2em"
          marginBottom={10}
        >
          Log In
        </Text>
        <VStack p={10}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            w="110%"
            type="text"
            bg=""
            placeholder="username"
            color="gray.800"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            w="110%"
            type="password"
            bg=""
            placeholder="password"
            color="gray.800"
          />
          <Button
            bg="blue.500"
            color="whitesmoke"
            _hover={{ bg: "blue.800" }}
            w="110%"
            onClick={submitedFunc}
          >
            Login
          </Button>
        </VStack>
        <HStack>
          <Text> you don't have account ? </Text>
          <Link to="/register">
            <Text decoration="underline">Register</Text>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default LogInPage;
