import { NextPage } from "next";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PageContent from "../../../../components/Layout/PageContent";
import PostItem from "../../../../components/Posts/PostItem";
import { auth } from "../../../../firebase/clientApp";
import usePostsData from "../../../../hooks/usePostsData";

interface IPostPageProps {}

const PostPage: NextPage = (props) => {
  const [user] = useAuthState(auth);
  const {
    setPostStateValue,
    postStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePostsData();
  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />
        )}
      </>
      <></>
    </PageContent>
  );
};

export default PostPage;
