import { Button, Input, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBlogForm(props: any) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const addBlog = async () => {
    try {
      if (!title || !message) {
        return;
      }

      const request = await fetch(`http://localhost:5005/api/v1/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, message }),
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
    <VStack h={"60vh"} bg="gray.300" justify={"center"} align="center">
      <VStack>
        <Input
          bg=""
          placeholder="title"
          size={"md"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          bg=""
          placeholder="Paragraph"
          size={"lg"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={addBlog} bg="blue.400">
          add blog
        </Button>
      </VStack>
    </VStack>
  );
}

export default AddBlogForm;
