import { Box, Button, Flex, Icon, Input, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import usePostsData from "../../../hooks/usePostsData";
import { Comment } from "./Comments";

interface CommentItemProps {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  onUpdateComment: (commentId: string, commentText: string) => void;
  loadingDelete: boolean;
  userId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  userId,
  onDeleteComment,
  onUpdateComment,
  loadingDelete,
  comment,
}) => {
  const [editInput, setEditInput] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const { postStateValue } = usePostsData();

  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} color="gray.300" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center " fontSize="8pt">
          <Text fontWeight="700">{comment.creatorDisplayText}</Text>
          {postStateValue.selectedPost?.creatorId === userId && (
            <Text textColor="rgb(0 121 211)" fontWeight={700}>
              OP
            </Text>
          )}
          <Text color="gray.500">
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
        </Stack>
        {editInput ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <Text fontSize="10pt">{comment.text}</Text>
        )}
        <Stack
          direction="row"
          align="center "
          cursor="pointer"
          color="gray.500"
        >
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.creatorId &&
            (editInput ? (
              <>
                <Button
                  fontSize="9pt"
                  bg="white"
                  p="0"
                  color="gray.400"
                  onClick={() => {
                    onUpdateComment(comment.id, editText);
                    setEditInput(false);
                  }}
                  _hover={{ color: "blue.600", bg: "blue:100" }}
                >
                  Save
                </Button>
                <Button
                  fontSize="9pt"
                  bg="white"
                  p="0"
                  color="gray.400"
                  onClick={() => setEditInput(false)}
                  _hover={{ color: "blue.600", bg: "blue:100" }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  fontSize="9pt"
                  bg="white"
                  p="0"
                  color="gray.400"
                  onClick={() => setEditInput(true)}
                  _hover={{ color: "blue.600", bg: "blue:100" }}
                >
                  Edit
                </Button>
                <Button
                  fontSize="9pt"
                  isLoading={loadingDelete}
                  bg="white"
                  p="1"
                  color="gray.400"
                  _hover={{ color: "red.300" }}
                  onClick={() => onDeleteComment(comment)}
                >
                  Delete
                </Button>
              </>
            ))}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default CommentItem;
