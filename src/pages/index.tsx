import { Stack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "../atoms/postsAtom";
import CreatePostLink from "../components/Communtiy/CreatePostLink";
import PageContent from "../components/Layout/PageContent";
import PostLoader from "../components/Posts/Loading";
import PostItem from "../components/Posts/PostItem";
import { auth, firestore } from "../firebase/clientApp";
import { useCommunityData } from "../hooks/useCommunityData";
import usePostsData from "../hooks/usePostsData";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    setPostStateValue,
    postStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePostsData();
  const { communityStateValue } = useCommunityData();

  const buildUserHomeFeed = async () => {
    //Fetch all posts from each community that user is in
    setLoading(true);
    try {
      if (communityStateValue.mySnippets.length) {
        const communitiesIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );

        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", communitiesIds),
          limit(10)
        );

        const postDocs = await getDocs(postQuery);

        const posts = postDocs.docs.map((post) => ({
          id: post.id,
          ...post.data(),
        }));

        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (error: any) {
      console.log("buildUserHomeFeed error", error);
    }
    setLoading(false);
  };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("handle buildNoUserHomeFeed error", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = () => {};

  //UseEffects
  useEffect(() => {
    if (communityStateValue.snippetFetched) buildUserHomeFeed();
  }, [communityStateValue.snippetFetched]);

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);
  return (
    <>
      <Head>
        <title>Reddit Clone</title>
      </Head>
      <PageContent>
        <>
          <CreatePostLink />
          {loading ? (
            <PostLoader />
          ) : (
            <Stack>
              {postStateValue.posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onSelectPost={onSelectPost}
                  onDeletePost={onDeletePost}
                  onVote={onVote}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (item) => item.postId === post.id
                    )?.voteValue
                  }
                  userIsCreator={post.creatorId === user?.uid}
                  homePage
                />
              ))}
            </Stack>
          )}
        </>
        <>{/* Recomandetion  */}</>
      </PageContent>
    </>
  );
};

export default Home;
