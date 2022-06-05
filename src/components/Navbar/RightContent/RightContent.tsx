import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import dynamic from "next/dynamic";
import React from "react";

import AuthButtons from "./AuthButtons";
import { Icons } from "./Icons";
import { UserMenu } from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const AuthModal = dynamic(() => import("../../Modal/Auth/AuthModal"));

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <Flex align="center" gap={2}>
      <AuthModal />
      {user ? <Icons /> : <AuthButtons />}
      <UserMenu user={user} />
    </Flex>
  );
};

export default RightContent;
