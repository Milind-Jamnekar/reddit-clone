import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  CommunityState,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

export const useCommunityData = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    joined: boolean
  ) => {
    //Is user sign in ?
    // If not => open auth modal
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    if (joined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  // fetching users data about which community he/she joined
  const getMySnippets = async () => {
    setLoading(true);
    try {
      //get users snippets
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
        snippetFetched: true,
      }));
      setLoading(false);
    } catch (error) {
      console.log("GetMySnippets error", error);
    }
  };

  const joinCommunity = async (communityData: Community) => {
    setLoading(true);

    try {
      //Batch Write
      const batch = writeBatch(firestore);
      ///Adding communitySnippet in user db
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        isMod: user?.uid === communityData.creatorId,
        profileImageURL: communityData.profileImageURL || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );

      //Updating numberOfMembers in communities
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      //Send batch
      await batch.commit();

      //update recoil community state
      setCommunityStateValue((val) => ({
        ...val,
        mySnippets: [...val.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.error("Handle error", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    setLoading(true);
    try {
      //Batch write
      const batch = writeBatch(firestore);

      /// deleting community from user db
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );

      ///  Updating the numberofmem
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      /// update the state

      setCommunityStateValue((val) => ({
        ...val,
        mySnippets: val.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.error("Handle error", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  const getCommunityData = async (communityId: string) => {
    try {
      const communityDocRef = doc(firestore, "communities", communityId);
      const communityDoc = await getDoc(communityDocRef);
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }));
    } catch (error: any) {}
  };

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetFetched: false,
      }));
      return;
    }
    getMySnippets();
  }, [user]);

  useEffect(() => {
    const { communityId } = router.query;

    if (communityId && !communityStateValue.currentCommunity) {
      getCommunityData(communityId as string);
    }
  }, [router.query, communityStateValue.currentCommunity]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
