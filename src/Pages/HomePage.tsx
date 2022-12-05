import { Button, useToast, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BlogCard from "../components/BlogCard";

function HomePage() {
  const [blogs, setBlogs] = useState<string[]>([]);

  const toast = useToast();
  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      const request = await fetch(`http://localhost:5005/api/v1/blog`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await request.json();
      setBlogs(data);
    } catch (error) {
      toast({
        title: "server Error !",
        position: "top",
        duration: 3000,
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const deleteBlog = async (id: string) => {
    try {
      const request = await fetch(`http://localhost:5005/api/v1/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await request.json();
      if (request.status !== 200) {
        toast({
          title: data.message,
          position: "top",
          duration: 3000,
          status: "error",
        });
      }

      toast({
        title: data.message,
        position: "top",
        duration: 3000,
        status: "success",
      });
      fetchdata();
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
    <VStack h="100vh" bg="gray.300" p={10} align="start">
      <Button
        onClick={() => navigate(`/addblog`)}
        bg={"blue.400"}
        _hover={{ bg: "blue.500" }}
        color="whitesmoke"
      >
        add new blog
      </Button>

      {blogs.map((blog: any) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          message={blog.message}
          delFunc={() => deleteBlog(blog.id)}
        />
      ))}
    </VStack>
  );
}

export default HomePage;
