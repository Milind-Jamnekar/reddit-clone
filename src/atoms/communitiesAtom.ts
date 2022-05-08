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
  communityImageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
};

export const CommunityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
