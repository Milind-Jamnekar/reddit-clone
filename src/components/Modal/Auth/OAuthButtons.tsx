import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { firebaseErrors } from "../../../firebase/firebaseErrors";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/googlelogo.png"
          alt="Google logo"
          width="20px"
          mr={2}
        />
        Continue with google
      </Button>
      <Button>Some other provider</Button>
      {error && (
        <Text color="red.500" textAlign="center" fontSize="10pt" my="5px">
          {" "}
          {firebaseErrors[error.message as keyof typeof firebaseErrors]}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;
