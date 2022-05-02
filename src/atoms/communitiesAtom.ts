import { Timestamp } from "firebase/firestore";
export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: string;
  privacyType: "public" | "protected" | "private";
  createdAt: Timestamp;
  profileImageURL?: string;
  bgImageURL?: string;
}
