import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

const SearchInput: React.FC = () => {
  return (
    <Flex flexGrow={1} ml={2} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<SearchIcon mb={1} color="gray.300" />}
        />
        <Input
          type="search"
          fontSize="18px"
          placeholder="Reddit Search"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          h="34px"
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
