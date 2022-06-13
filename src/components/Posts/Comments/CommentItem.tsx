import { Box, Button, Flex, Icon, Input, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { FC, useState } from "react";
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

const CommentItem: FC<CommentItemProps> = ({
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
        <Stack direction="row" align="center " fontSize="10pt">
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
          <Text fontSize="14pt">{comment.text}</Text>
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
                  fontSize="8pt"
                  variant="ghost"
                  size="xs"
                  colorScheme="blue"
                  onClick={() => {
                    onUpdateComment(comment.id, editText);
                    setEditInput(false);
                  }}
                >
                  Save
                </Button>
                <Button
                  size="xs"
                  fontSize="8pt"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => setEditInput(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  fontSize="8pt"
                  size="xs"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => setEditInput(true)}
                >
                  Edit
                </Button>
                <Button
                  fontSize="8pt"
                  size="xs"
                  variant="ghost"
                  colorScheme="blue"
                  isLoading={loadingDelete}
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
