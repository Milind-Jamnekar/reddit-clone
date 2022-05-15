import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { Comment } from "./Comments";

interface CommentItemProps {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  userId,
  onDeleteComment,
  loadingDelete,
  comment,
}) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} color="gray.300" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center " fontSize="8pt">
          <Text fontWeight="700">{comment.creatorDisplayText}</Text>
          <Text color="gray.500">
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
        </Stack>
        <Text fontSize="10pt">{comment.text}</Text>
        <Stack
          direction="row"
          align="center "
          cursor="pointer"
          color="gray.500"
        >
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.creatorId && (
            <>
              <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Edit
              </Text>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default CommentItem;
