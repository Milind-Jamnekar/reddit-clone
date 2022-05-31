import { Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { CommunityState } from "../../../atoms/communitiesAtom";
import About from "../../../components/Communtiy/About";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { auth } from "../../../firebase/clientApp";
import { useCommunityData } from "../../../hooks/useCommunityData";

const SubmitPage: NextPage = () => {
  const { communityStateValue } = useCommunityData();
  const [user] = useAuthState(auth);

  return (
    <PageContent>
      <>
        <Box p="0px 0px" borderBottom="1px solid " borderColor="white">
          <Text fontSize="xl" fontWeight="bold">
            Create post
          </Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={
              communityStateValue.currentCommunity?.profileImageURL
            }
          />
        )}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};

export default SubmitPage;
