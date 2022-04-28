import { Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import Login from "./Login";
import Signup from "./Signup";

const AuthInputs: React.FC = () => {
  const ModalState = useRecoilValue(authModalState);
  return (
    <Flex
      width="100%"
      mt={4}
      direction="column"
      align="center"
      justify="center"
    >
      <AnimatePresence>
        {ModalState.view === "login" && <Login />}
        {ModalState.view === "signup" && <Signup />}
      </AnimatePresence>
    </Flex>
  );
};

export default AuthInputs;
