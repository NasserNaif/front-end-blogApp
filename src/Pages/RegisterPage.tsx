import {
  Button,
  HStack,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const RegisterFunc = async () => {
    try {
      if (password !== confirmPassword) {
        toast({
          title: "you must confirm the password !",
          duration: 3000,
          status: "error",
          position: "top",
        });
      }
      const request = await fetch(
        `http://localhost:5005/api/v1/user/registar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        }
      );
      const data = await request.json();
      if (request.status !== 201) {
        toast({
          title: data.message,
          duration: 3000,
          status: "error",
          position: 'top',
        });
        return;
      }
      toast({
        title: data.message,
        duration: 3000,
        status: "success",
        position: "top",
      });


      navigate(`/login`);


    } catch (errpr) {
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
        h="60vh"
        borderRadius="10"
      >
        <Text
          fontWeight="700"
          fontFamily="verdana"
          fontSize="2em"
          marginBottom={10}
        >
          Register
        </Text>
        <VStack p={5}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            w="110%"
            type="email"
            bg=""
            placeholder="email"
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
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            w="110%"
            type="password"
            bg=""
            placeholder="confirm password"
            color="gray.800"
          />
          <Button
            bg="blue.500"
            color="whitesmoke"
            _hover={{ bg: "blue.800" }}
            w="110%"
            onClick={RegisterFunc}
          >
            Register
          </Button>
        </VStack>
        <HStack>
          <Text>already have account ? </Text>
          <Link to="/login">
            <Text decoration="underline">login</Text>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default RegisterPage;
