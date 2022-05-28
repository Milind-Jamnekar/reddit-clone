import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Post, postState } from "../../../atoms/postsAtom";
import { firestore } from "../../../firebase/clientApp";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

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
  const [loadingDelete, setLoadingDelete] = useState("");

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

      comment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
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

  const onDeleteComment = async (comment: Comment) => {
    setLoadingDelete(comment.id);
    try {
      //delete comment from document
      const batch = writeBatch(firestore);
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);
      //update comment count on post  -1
      const postDocRef = doc(firestore, "posts", comment.postId);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      // commit all changes
      await batch.commit();

      //update client recoil state
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));

      // Update local component state
      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error: any) {
      console.error("onDeleteComment error", error.message);
    }
    setLoadingDelete("");
  };

  const onUpdateComment = async (commentId: string, newText: string) => {
    //Update on document
    try {
      const commentDocRef = doc(firestore, "comments", commentId);
      updateDoc(commentDocRef, {
        text: newText,
      });

      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id === commentId) comment.text = newText;
          return comment;
        })
      );
    } catch (error: any) {
      console.error("handle updateComment", error.message);
    }
    //Update on local state
  };

  const getPostComments = async () => {
    try {
      const commentQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        orderBy("createdAt", "desc")
      );
      const commentsDocs = await getDocs(commentQuery);
      const comments = commentsDocs.docs.map((comment) => ({
        id: comment.id,
        ...comment.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error: any) {
      console.log("getPostError", error.message);
    }
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
  }, [selectedPost]);

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
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle />
                <SkeletonText mt={3} noOfLines={2} spacing={4} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight="700" opacity={0.3}>
                  No comments yet! 😴
                </Text>
              </Flex>
            ) : (
              <>
                {" "}
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    onUpdateComment={onUpdateComment}
                    loadingDelete={comment.id === loadingDelete}
                    userId={user?.uid || ""}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Comments;
