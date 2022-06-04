import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
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
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement | MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onSelectPost?: (post: Post) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  homePage?: boolean;
}

const PostItem: React.FunctionComponent<IPostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onDeletePost,
  onSelectPost,
  onVote,
  homePage,
}) => {
  const [error, setError] = useState("");
  const [loadingImage, setLoadinImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const singlePostPage = !onSelectPost;
  const router = useRouter();

  const handlePostDelete = async (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post! 😨");
      }

      if (singlePostPage) {
        router.push(`r/${post.communityId}/`);
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  // 1000 karma convert to 1k
  function kFormatter(num: number) {
    if (num > 999) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  }

  const variant = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };

  return (
    <Flex
      as={motion.div}
      border="1px solid"
      bg="white"
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "white" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variant}
    >
      {/* Voting section  */}
      <Flex
        direction={"column"}
        align="center"
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width={["50px", "40px"]}
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
        gap={[1, null]}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={[35, 22]}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor={"pointer"}
        />
        <Text fontSize={["13pt", "10pt"]} fontWeight={700}>
          {kFormatter(post.voteStatus)}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={[35, 22]}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor={"pointer"}
        />
      </Flex>

      {/* Post Content  */}
      <Flex
        direction="column"
        width="100%"
        onClick={() => onSelectPost && onSelectPost(post)}
      >
        <Flex direction="column" p="10px">
          {/* User Info  */}
          <HStack>
            {/* Home Page check  */}
            {homePage && (
              <Flex align="center" gap={1}>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    borderRadius="full"
                    boxSize="16px"
                    alt=" "
                  />
                ) : (
                  <Icon as={FaReddit} fontSize="16pt" color="blue.500" />
                )}
                <Link href={`r/${post.communityId}`}>
                  <Text
                    fontWeight={600}
                    _hover={{ textDecoration: "underline" }}
                    onClick={(e) => e.stopPropagation()}
                    fontSize="10pt"
                  >{`r/${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} fontSize="10px" color="gray.500" />
              </Flex>
            )}
            <Text fontSize="9pt" color="gray.500">
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </HStack>

          {/* Post title  */}
          <Text fontSize={["17pt", "14pt"]} fontWeight={600}>
            {post.title}
          </Text>

          {/* Post Body  */}
          <Text mt={2} fontSize={["13pt", "10pt"]} noOfLines={[4, 2, 5]}>
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

        {/* Bottom section  */}
        <Flex ml={2} mb={2} color="gray.500" fontWeight={4}>
          {/* Comments  */}
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

          {/* share  */}
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

          {/* save  */}
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

          {/* Delete post  */}
          {userIsCreator && (
            <Flex
              align={"center"}
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handlePostDelete}
              gap={2}
            >
              {loadingDelete ? (
                <Spinner size={"sm"} />
              ) : (
                <>
                  <Icon as={AiOutlineDelete}></Icon>
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>

        {/* error handling UI  */}
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Failed to delete post! 😱</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};

export default PostItem;
