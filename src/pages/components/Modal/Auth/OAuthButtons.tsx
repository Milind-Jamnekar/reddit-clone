import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { firebaseErrors } from "../../../firebase/firebaseErrors";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

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
