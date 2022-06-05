import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { User } from "firebase/auth";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const bg = useColorModeValue("gray.100", "whiteAlpha.100");
  const hoverBg = useColorModeValue("white", "blackAlpha.600");
  const color = useColorModeValue("blue.500", "white");

  return (
    <Flex flexGrow={1} maxWidth={user ? "auto" : "600px"} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon mb={1} color="gray.300" />
        </InputLeftElement>
        <Input
          type="search"
          fontSize="18px"
          placeholder="Reddit Search"
          bg={bg}
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: bg, border: "1px solid", borderColor: { color } }}
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
