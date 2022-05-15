import { Box, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Post } from "../../../atoms/postsAtom";
import { firestore } from "../../../firebase/clientApp";
import CommentInput from "./CommentInput";
import { postState } from "../../../atoms/postsAtom";

interface ICommentsProps {
  user: User;
  selectedPost: Post | null;
  communityId: string;
}

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

const Comments: React.FC<ICommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async (commentText: string) => {
    setCreateLoading(true);
    try {
      const batch = writeBatch(firestore);
      const commentDocRef = doc(collection(firestore, "comments"));

      //Create comment document
      const comment: Comment = {
        id: commentDocRef.id,
        text: commentText,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        creatorId: user.uid,
        communityId: communityId,
        createdAt: serverTimestamp() as Timestamp,
        creatorDisplayText: user.email!?.split("@")[0],
      };

      batch.set(commentDocRef, comment);
      //update comment count on post + 1
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, { numberOfComments: increment(1) });

      await batch.commit();

      setCommentText("");
      setComments((prev) => [comment, ...prev]);
      //update client recoil state
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error: any) {
      console.log("handle error from Comments comp", error.message);
    }

    setCreateLoading(false);
  };
  const onDeleteComment = async (comment: any) => {
    //Create comment document
    //update comment count on post + 1
    //update client recoil state
  };
  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize={"10pt"}
        width="100%"
      >
        <CommentInput
          user={user}
          comment={commentText}
          setComment={setCommentText}
          onCreateComment={onCreateComment}
          loading={createLoading}
        />
      </Flex>
    </Box>
  );
};

export default Comments;
