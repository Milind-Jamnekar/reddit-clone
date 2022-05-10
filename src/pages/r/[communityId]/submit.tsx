import { Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { CommunityState } from "../../../atoms/communitiesAtom";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { auth } from "../../../firebase/clientApp";

const SubmitPage: NextPage = () => {
  const communityStateValue = useRecoilValue(CommunityState);
  const [user] = useAuthState(auth);

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid " borderColor="white">
          <Text>Create post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
      {/* <>About </> */}
    </PageContent>
  );
};

export default SubmitPage;
