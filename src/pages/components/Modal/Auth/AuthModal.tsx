import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Basic Modal Body</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
