import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import {
  Community,
  CommunitySnippet,
  CommunityState,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

export const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    joined: boolean
  ) => {
    //Is user sign in ?
    // If not => open auth modal

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
        isMod: false,
        profileImageURL: communityData.profileImageURL || "",
      };

      console.log(user?.uid);

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

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
