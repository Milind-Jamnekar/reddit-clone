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
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [ModalState, setModalState] = useRecoilState(authModalState);

  const [user, loading, error] = useAuthState(auth);

  const handleClose = () =>
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <>
      <Modal
        isOpen={ModalState.open}
        onClose={handleClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="3px" />
        <ModalContent boxShadow="2xl">
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
              width={{ base: "80%", md: "70%" }}
            >
              {ModalState.view === "login" || ModalState.view === "signup" ? (
                <>
                  <OAuthButtons />
                  <Flex direction="row" width="100%" align="center">
                    <Divider />
                    <Text color="gray.500" mx={2} fontWeight="700">
                      OR
                    </Text>
                    <Divider />
                  </Flex>
                  {/* Login and Singup inputs  */}
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
