import { Flex, Icon, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { TabItem } from "./NewPostForm";

interface ITabItemProps {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
}

const TabItem: FC<ITabItemProps> = ({ item, selected, setSelectedTab }) => {
  return (
    <Flex
      align="center"
      justify="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      _hover={{ bg: "gray.100" }}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "1px 1px 3px 1px" : "1px 1px 1px 1px"}
      borderColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      borderLeftColor="gray.200"
      onClick={() => setSelectedTab(item.title)}
      gap={2}
    >
      <Flex>
        <Icon as={item.icon} />
      </Flex>
      <Text>{item.title}</Text>
    </Flex>

    //   <Tab>
    //   <Icon as={item.icon} />

    // </Tab>
  );
};

export default memo(TabItem);
