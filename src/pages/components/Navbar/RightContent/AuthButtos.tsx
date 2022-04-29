import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const AuthButtons: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);
  return (
    <Flex gap={2} mx={2}>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        Login
      </Button>
      <Button
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        onClick={() => setModalState({ open: true, view: "signup" })}
      >
        Signup
      </Button>
    </Flex>
  );
};

export default AuthButtons;
