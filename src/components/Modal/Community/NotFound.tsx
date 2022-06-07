import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export const NotFound = () => {
  return (
    <Flex direction="column" justify={"center"} align="center" minHeight="60vh">
      <Text fontSize="4xl">
        Sorry, This community does not exists or has been banned! 😶
      </Text>
      <Link href="/" passHref>
        <Button mt="4" size="lg">
          GO Home
        </Button>
      </Link>
    </Flex>
  );
};
