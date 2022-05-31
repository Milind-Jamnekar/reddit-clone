import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import { Community, CommunityState } from "../../../atoms/communitiesAtom";
import About from "../../../components/Communtiy/About";
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
  const setCommunityData = useSetRecoilState(CommunityState);

  useEffect(() => {
    setCommunityData((prev) => ({
      ...prev,
      currentCommunity: data,
    }));
  }, [data, setCommunityData]);

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
        <About communityData={data} />
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

    const communityDoc = await getDoc(communityDocRef);
    // const communityData = await Object;
    console.log(communityDoc.data());

    return {
      props: {
        data: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
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
