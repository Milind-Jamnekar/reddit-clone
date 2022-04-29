import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtos";
import { Icons } from "./Icons";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <Flex align="center">
      <AuthModal />
      {user ? <Icons /> : <AuthButtons />}
      {/* <Menu /> */}
    </Flex>
  );
};

export default RightContent;
