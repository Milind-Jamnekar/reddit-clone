import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "../../../../atoms/postsAtom";
import About from "../../../../components/Communtiy/About";
import PageContent from "../../../../components/Layout/PageContent";
import Comments from "../../../../components/Posts/Comments/Comments";
import PostItem from "../../../../components/Posts/PostItem";
import { auth, firestore } from "../../../../firebase/clientApp";
import { useCommunityData } from "../../../../hooks/useCommunityData";
import usePostsData from "../../../../hooks/usePostsData";

interface IPostPageProps {}

const PostPage: NextPage = (props) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const {
    setPostStateValue,
    postStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePostsData();

  const { communityStateValue } = useCommunityData();

  const fetchPost = async (pid: string) => {
    try {
      const postDocRef = doc(firestore, "posts", pid);
      const postDoc = await getDoc(postDocRef);

      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error: any) {
      console.log("handle error in pid", error.message);
    }
  };

  useEffect(() => {
    const pid = router.query.pid;

    if (pid && !communityStateValue.currentCommunity) {
      fetchPost(pid as string);
    }
  }, [router.query, communityStateValue.currentCommunity]);

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
        <Comments
          user={user as User}
          selectedPost={postStateValue.selectedPost}
          communityId={communityStateValue.currentCommunity?.id as string}
        />
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};

export default PostPage;
