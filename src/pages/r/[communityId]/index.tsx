import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Community } from "../../../atoms/communitiesAtom";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import { NotFound } from "../../../components/Modal/Community/NotFound";
import Header from "../../../components/Communtiy/Header";

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
