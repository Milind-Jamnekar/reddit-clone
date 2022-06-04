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
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import useDirectory from "../../../hooks/useDirectory";
import { Communities } from "./Communitites";
import SideMenu from "./SideMenu";

export const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");

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
                boxSize="27px"
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

      {isLargerThan400 ? (
        <MenuList>
          <Communities />
        </MenuList>
      ) : (
        <SideMenu />
      )}
    </Menu>
  );
};
