import { Flex, HStack, Icon, Menu, MenuButton, Text } from "@chakra-ui/react";
import { TiHome } from "react-icons/ti";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const Directory: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="3px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <HStack
          justifyContent="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }}></Icon>
            <Text display={{ base: "none", md: "unset" }}>Home</Text>
          </Flex>
          <ChevronDownIcon fontSize={23} />
        </HStack>
      </MenuButton>
    </Menu>
  );
};
