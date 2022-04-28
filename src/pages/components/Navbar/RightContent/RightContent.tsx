import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtos";

type RightContentProps = {
  user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <Flex align="center">
      <AuthModal />
      {user ? (
        <Button onClick={() => signOut(auth)}>Sign Out</Button>
      ) : (
        <AuthButtons />
      )}
    </Flex>
  );
};

export default RightContent;
