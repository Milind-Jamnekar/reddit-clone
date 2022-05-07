import { Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";
import ImageUpload from "./ImageUpload";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

interface INewPostFormProps {}

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

const NewPostForm: React.FC<INewPostFormProps> = (props) => {
  // Text Input
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  // file input
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);

  const handleCreatePost = async () => {};

  // handler for image change
  const onSelectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
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
            loading={false}
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
    </Flex>
  );
};

export default NewPostForm;
