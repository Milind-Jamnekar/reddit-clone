import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtos";

const RightContent: React.FC = () => {
  return (
    <Flex align="center">
      <AuthModal />
      <AuthButtons />
    </Flex>
  );
};

export default RightContent;
