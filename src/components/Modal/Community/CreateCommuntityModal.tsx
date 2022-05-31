/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
//Icons
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "../../../firebase/clientApp";
import useDirectory from "../../../hooks/useDirectory";

export const CreateCommunityModal: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charCount, setCharCount] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toggleMenuOpen } = useDirectory();

  const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
    console.log(e.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");

    //Validate Community name
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName)) {
      setError(
        "Community name must be 3-21 characters and can only contain letters, numbers and characters"
      );
      return;
    }

    if (communityName === "") {
      setError("You forget to type the communtiy name senpai 😑");
    }

    setLoading(true);
    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      await runTransaction(firestore, async (transaction) => {
        //Check if document is already present
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists())
          throw new Error(
            `Sorry r/${communityName} is already exists 😟, Try another`
          );

        //Create new document
        await transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        await transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isMod: true,
          }
        );

        handleClose();
        toggleMenuOpen();
        router.push(`r/${communityName}`);
      });
    } catch (error: any) {
      console.log("Handled errors", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.target.value;
    if (text.length > 21) return;
    setCommunityName(text);
    setCharCount(21 - text.length);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            padding={3}
            flexDirection="column"
            fontSize={18}
          >
            Create Community
          </ModalHeader>
          <Box px={5}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDirection="column"
              padding="10px 0px"
              gap={3}
              //   border="1px solid red"
            >
              <Box>
                <Text fontSize={15} fontWeight={600}>
                  Name
                </Text>
                <Text fontSize={12} color="gray.500">
                  Community name including capitalization cannot be changed!
                </Text>
              </Box>

              <Box>
                <InputGroup size="md">
                  <InputLeftAddon children="r/" fontWeight={600} />
                  <Input
                    type="text"
                    placeholder="Community name"
                    value={communityName}
                    onChange={handleChange}
                  />
                </InputGroup>
                <Text fontSize="9pt" color={charCount === 0 ? "red" : ""}>
                  {charCount} characters remaining
                </Text>
                {error && (
                  <Text fontSize={"9pt"} color="red.400">
                    {error}
                  </Text>
                )}
              </Box>

              <Stack spacing={2}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>

                <Stack spacing={3}>
                  <Checkbox
                    isChecked={communityType === "public"}
                    name="public"
                    onChange={onCommunityTypeChange}
                  >
                    <Stack
                      align={["", "center"]}
                      direction={["column", "row"]}
                      spacing={[0, 2]}
                    >
                      <Text fontSize="12pt" justifyContent="center">
                        {" "}
                        <Icon as={BsFillPersonFill} mr={2} />
                        Public
                      </Text>
                      <Text fontSize="9pt" color="gray.600">
                        Anyone can view, post and comment to this community{" "}
                      </Text>
                    </Stack>
                  </Checkbox>

                  <Checkbox
                    isChecked={communityType === "restricted"}
                    name="restricted"
                    onChange={onCommunityTypeChange}
                  >
                    <Stack
                      align={["", "center"]}
                      direction={["column", "row"]}
                      spacing={[0, 2]}
                    >
                      <Text fontSize="12pt">
                        <Icon as={BsFillEyeFill} mr={2} />
                        Restricted
                      </Text>
                      <Text fontSize="9pt" color="gray.600">
                        Anyone can view this community but only approved user
                        can post{" "}
                      </Text>
                    </Stack>
                  </Checkbox>
                  <Checkbox
                    isChecked={communityType === "private"}
                    name="private"
                    onChange={onCommunityTypeChange}
                  >
                    <Stack
                      align={["", "center"]}
                      direction={["column", "row"]}
                      spacing={[0, 2]}
                    >
                      <Text fontSize="12pt">
                        <Icon as={HiLockClosed} mr={2} />
                        Private
                      </Text>
                      <Text fontSize="9pt" color="gray.600">
                        Only approved users can view this commnity and submit to
                        this community{" "}
                      </Text>
                    </Stack>
                  </Checkbox>
                </Stack>
              </Stack>
            </ModalBody>
          </Box>

          <ModalFooter bgColor="gray.200" borderRadius="0px 0px 10px 10px">
            <Button
              colorScheme="blue"
              mr={3}
              variant="outline"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button isLoading={loading} onClick={handleCreateCommunity}>
              Create community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
