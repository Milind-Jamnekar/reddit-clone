import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

export const Icons: React.FC = () => {
  return (
    <>
      <Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          borderRight="1px solid"
          borderColor="gray.300"
        >
          <Flex
            mx={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={BsArrowUpRightCircle} fontSize={23} />
          </Flex>
          <Flex
            mx={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoFilterCircleOutline} fontSize={25} />
          </Flex>
          <Flex
            mx={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoVideocamOutline} fontSize={25} />
          </Flex>
        </Flex>
        <>
          <Flex
            mx={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={BsChatDots} fontSize={23} />
          </Flex>
          <Flex
            mx={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoNotificationsOutline} fontSize={23} />
          </Flex>
          <Flex
            display={{ base: "none", md: "flex" }}
            mx={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={GrAdd} fontSize={23} />
          </Flex>
        </>
      </Flex>
    </>
  );
};
