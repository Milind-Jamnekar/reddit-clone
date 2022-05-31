import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: string;
  privacyType: "public" | "protected" | "private";
  createdAt: Timestamp;
  profileImageURL?: string;
  bgImageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isMod: boolean;
  profileImageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community;
  snippetFetched: boolean;
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
  snippetFetched: false,
};

export const CommunityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
