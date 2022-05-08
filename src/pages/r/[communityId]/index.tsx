import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import safeJsonStringify from "safe-json-stringify";
import { Community } from "../../../atoms/communitiesAtom";
import CreatePostLink from "../../../components/Communtiy/CreatePostLink";
import Header from "../../../components/Communtiy/Header";
import PageContent from "../../../components/Layout/PageContent";
import { NotFound } from "../../../components/Modal/Community/NotFound";
import Posts from "../../../components/Posts/Posts";
import { firestore } from "../../../firebase/clientApp";

type CommunityPageProps = {
  data: Community;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ data }) => {
  if (!data) {
    return <NotFound />;
  }
  return (
    <>
      <Header communityData={data} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={data}></Posts>
        </>
        <>RHS</>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get com data and pass it to client
  try {
    const communityDocRef = await doc(
      firestore,
      "communities",
      context.query.communityId as string
    );

    const Object = await getDoc(communityDocRef);
    const communityData = await Object;
    return {
      props: {
        data: communityData.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityData.id,
                ...communityData.data(),
              })
            )
          : "",
      },
    };
  } catch (error: any) {
    console.log("error comming from server", error);
  }
}

export default CommunityPage;
