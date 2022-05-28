import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { TiHome } from "react-icons/ti";
import useDirectory from "../../../hooks/useDirectory";
import { Communities } from "./Communitites";

export const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor="pointer"
        padding="3px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <HStack
          justifyContent="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                borderRadius="full"
                boxSize="24px"
                mr={2}
                alt={directoryState.selectedMenuItem.displayText + "image"}
              />
            ) : (
              <Icon
                as={directoryState.selectedMenuItem.icon}
                fontSize={24}
                mr={{ base: 1, md: 2 }}
              ></Icon>
            )}
            <Text display={{ base: "none", md: "unset" }}>
              {directoryState.selectedMenuItem.displayText}
            </Text>
          </Flex>
          <ChevronDownIcon fontSize={23} />
        </HStack>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
