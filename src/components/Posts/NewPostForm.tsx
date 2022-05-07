import { Flex, Icon, Text } from "@chakra-ui/react";
import * as React from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import {
  IoDocumentText,
  IoDocumentTextOutline,
  IoImageOutline,
} from "react-icons/io5";
import TabItem from "./TabItem";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
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
  const [textInputs, setTextInputs] = React.useState({
    title: "",
    body: "",
  });
  const [selectedTab, setSelectedTab] = React.useState(formTabs[0].title);

  const handleCreatePost = async () => {};

  const onSelectedImage = () => {};

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
      <Flex p={4}>
        {selectedTab === "Post" ? (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={false}
          />
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
