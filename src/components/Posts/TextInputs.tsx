import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import * as React from "react";

interface ITextInputsProps {
  textInputs: {
    title: string;
    body: string;
  };

  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
}

const TextInputs: React.FunctionComponent<ITextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack width="100%" spacing="3">
      <Input
        type="text"
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      />
      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Text (Optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          p="0px 30px"
          disabled={!textInputs.title}
          onClick={handleCreatePost}
          isLoading={loading}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
