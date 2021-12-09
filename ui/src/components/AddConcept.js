import { Stack, Input, Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { nanoid } from "nanoid";

function AddConcept({ addTodo }) {
  const toast = useToast();
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (value === "") {
      toast({
        title: "Please enter the text.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const concept = {
      id: nanoid(),
      displayName: value,
      description: "",
    };

    addTodo(concept);
    setValue("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <Input
          mt={5}
          value={value}
          variant="outline"
          type="text"
          placeholder="Enter your Concept..."
          onChange={(e) => setValue(e.target.value)}
        />
        <Button colorScheme="teal" type="submit">
          Add Concept
        </Button>
      </Stack>
    </form>
  );
}

export default AddConcept;
