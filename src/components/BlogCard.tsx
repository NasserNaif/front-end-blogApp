import { Button, Text, VStack } from "@chakra-ui/react";
import React from "react";

function BlogCard(props: any) {
  return (
    <VStack
      fontFamily={"verdana"}
      align={"start"}
      bg="whitesmoke"
      w={"100%"}
      p={2}
      borderRadius="10"
    >
      <Text fontSize={"1.9em"}>{props.title} :</Text>

      <Text fontSize={"1.3em"}>{props.message}</Text>

      <Button
        color="whitesmoke"
        bg="red.400"
        _hover={{ bg: "red.600" }}
        onClick={props.delFunc}
      >
        delete
      </Button>
    </VStack>
  );
}

export default BlogCard;
