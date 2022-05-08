import { Flex, HStack, Icon, Image, Skeleton, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Post } from "../../atoms/postsAtom";

interface IPostItemProps {
  post: Post;
  userIsCreator: boolean;
  userVoteStatus?: number;
  onVote: () => {};
  onSelectPost: () => void;
  onDeletePost: () => {};
}

const PostItem: React.FunctionComponent<IPostItemProps> = ({
  post,
  userIsCreator,
  userVoteStatus,
  onDeletePost,
  onSelectPost,
  onVote,
}) => {
  const [loadingImage, setLoadinImage] = useState(true);

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
    >
      {/* Voting section  */}
      <Flex
        direction={"column"}
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={
            userVoteStatus === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteStatus === 1 ? "brand.100" : ""}
          fontSize={22}
          onClick={onVote}
          cursor={"pointer"}
        />
        <Text fontSize={"9pt"}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteStatus === 1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteStatus === 1 ? "brand.100" : ""}
          fontSize={22}
          onClick={onVote}
          cursor={"pointer"}
        />
      </Flex>
      {/* Post Content  */}
      <Flex direction="column" width="100%">
        <Flex direction="column" p="10px">
          {/* User Info  */}
          <HStack>
            {/* Home Page check  */}
            <Text fontSize="10pt" color="gray.500">
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </HStack>

          {/* Post title  */}
          <Text fontSize="14pt" fontWeight={600}>
            {post.title}
          </Text>

          {/* Post Body  */}
          <Text mt={2} fontSize="10pt" noOfLines={[4, 6, 10]}>
            {post.body}
          </Text>

          {/* Post Image if have any */}
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                maxHeight="460px"
                alt="post image"
                display={loadingImage ? "none" : ""}
                onLoad={() => setLoadinImage(false)}
              />
            </Flex>
          )}
        </Flex>
        <Flex ml={2} mb={2} color="gray.500" fontWeight={4}>
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            gap={2}
          >
            <Icon as={BsChat}></Icon>
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            gap={2}
          >
            <Icon as={IoArrowRedoOutline}></Icon>
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            gap={2}
          >
            <Icon as={IoBookmarkOutline}></Icon>
            <Text fontSize="9pt">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align={"center"}
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={onDeletePost}
              gap={2}
            >
              <Icon as={AiOutlineDelete}></Icon>
              <Text fontSize="9pt">Delete</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
