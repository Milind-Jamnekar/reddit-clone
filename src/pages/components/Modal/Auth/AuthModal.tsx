import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
  const [ModalState, setModalState] = useRecoilState(authModalState);

  const handleClose = () =>
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  return (
    <>
      <Modal isOpen={ModalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {ModalState.view === "login" && "Login"}
            {ModalState.view === "signup" && "Sign Up"}
            {ModalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={10}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              <OAuthButtons />
              <Flex direction="row" width="100%" align="center">
                <Divider />
                <Text color="gray.500" mx={2} fontWeight="700">
                  OR
                </Text>
                <Divider />
              </Flex>
              <AuthInputs />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
