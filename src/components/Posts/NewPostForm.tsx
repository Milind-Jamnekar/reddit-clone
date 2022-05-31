import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";
import { Post } from "../../atoms/postsAtom";
import ImageUpload from "./PostForm/ImageUpload";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import useSelectFile from "../../hooks/useSelectFile";

interface INewPostFormProps {
  user: User;
  communityImageURL?: string;
}

const formTabs: TabItem[] = [
  { title: "Post", icon: IoDocumentTextOutline },
  { title: "Images & Video", icon: IoImageOutline },
  { title: "Link", icon: BsLink45Deg },
  { title: "Poll", icon: BiPoll },
  { title: "Talk", icon: BsMic },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<INewPostFormProps> = ({
  user,
  communityImageURL,
}) => {
  const router = useRouter();
  // Text Input
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  // file input
  // const [selectedFile, setSelectedFile] = useState<string>("");
  const { selectedFile, setSelectedFile, onSelectedImage } = useSelectFile();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //handler for creating post in database
  const handleCreatePost = async () => {
    const { communityId } = router.query;
    const { title, body } = textInputs;
    //New Post
    // const newPost: Post = {
    //   communityId: communityId as string,
    //   title: textInputs.title,
    //   body: textInputs.body,
    //   creatorId: user?.uid,
    //   creatorDisplayName: user.email!.split("@")[0],
    //   numberOfComments: 0,
    //   voteStatus: 0,
    //   createdAt: serverTimestamp() as Timestamp,
    //   communityImageURL: communityImageURL || "",
    // };
    setLoading(true);
    try {
      // Create the post in db
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId,
        communityImageURL: communityImageURL || "",
        creatorId: user.uid,
        userDisplayText: user.email!.split("@")[0],
        title,
        body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      });

      // Check for selectedFile
      if (selectedFile) {
        //store in storage => getDowloadURL (returrs url)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const dowloadURL = await getDownloadURL(imageRef);

        // update post doc by adding imageURL
        await updateDoc(postDocRef, {
          imageURL: dowloadURL,
        });
      }
    } catch (error: any) {
      console.log("handle CreatePost error", error.message);
      setError(error.message);
    }

    // redirect the user back to the communityPage using the router
    router.back();
    setLoading(false);
  };

  // handler for text form change
  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius="4" mt="2">
      {/* Tabs  */}
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}

        {/* <Tabs>
          <TabList>
            {formTabs.map((item) => (
              <Tab
                p="15px"
                gap={2}
                key={item.title}
                isSelected={item.title === selectedTab}
                onClick={() => setSelectedTab(item.title)}
                _hover={{ bg: "gray.200" }}
                _focus={{ outline: "none" }}
              >
                <Icon as={item.icon}></Icon>
                <Text>{item.title}</Text>
              </Tab>
            ))}
          </TabList>
        </Tabs> */}
      </Flex>

      {/* Form  */}
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
            onSelectedImage={onSelectedImage}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error while creating post!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
