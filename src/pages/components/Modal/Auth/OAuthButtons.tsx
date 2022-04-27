import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";

const OAuthButtons: React.FC = () => {
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2}>
        <Image
          src="/images/googlelogo.png"
          alt="Google logo"
          width="20px"
          mr={2}
        />
        Continue with google
      </Button>
      <Button>Some other provider</Button>
    </Flex>
  );
};

export default OAuthButtons;
