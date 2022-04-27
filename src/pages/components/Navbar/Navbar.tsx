import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" h="50px" padding="6px 12px" align="center">
      <Flex align="center" justify="center">
        <Image src="/images/redditFace.svg" h="30px" alt="Reddit Face logo" />
        <Image
          src="/images/redditText.svg"
          h="46px"
          display={{ base: "none", md: "unset" }}
          alt="Reddit text logo"
        />
      </Flex>
      <SearchInput />
      <RightContent />
    </Flex>
  );
};

export default Navbar;
