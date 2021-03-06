import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

export const Icons: FC = () => {
  const hoverBg = useColorModeValue("gray.200", "whiteAlpha.200");
  const color = useColorModeValue("black.900", "white");

  return (
    <>
      <Flex gap={2}>
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          borderRight="1px solid"
          borderColor="gray.300"
          paddingRight={2}
          gap={2}
        >
          <Flex
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
          >
            <Icon as={BsArrowUpRightCircle} fontSize={23} />
          </Flex>
          <Flex
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
          >
            <Icon as={IoFilterCircleOutline} fontSize={25} />
          </Flex>
          <Flex
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
          >
            <Icon as={IoVideocamOutline} fontSize={25} />
          </Flex>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} gap={2}>
          <Flex
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
          >
            <Icon as={BsChatDots} fontSize={23} />
          </Flex>
          <Flex
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
          >
            <Icon as={IoNotificationsOutline} fontSize={23} />
          </Flex>
          <Flex
            display={{ base: "none", md: "flex" }}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: hoverBg }}
          >
            <Icon as={GrAdd} fontSize={23} color={color} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
