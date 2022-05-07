import { Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/NewPostForm";

const SubmitPage: NextPage = () => {
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid " borderColor="white">
          <Text>Create post</Text>
        </Box>
        <NewPostForm />
      </>
      <></>
      {/* <>About </> */}
    </PageContent>
  );
};

export default SubmitPage;
