import {
  Flex,
  Icon,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { GiCheckedShield } from "react-icons/gi";

const Premium = () => {
  const borderBg = useColorModeValue("gray.300", "gray.600");
  const bg = useColorModeValue("white", "gray.700");

  return (
    <Flex
      direction="column"
      bg={bg}
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border="1px solid"
      borderColor={borderBg}
    >
      <Flex mb={2}>
        <Icon as={GiCheckedShield} fontSize={26} color="brand.100" mt={2} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Text fontWeight={600}>Reddit Premium</Text>
          <Text>The best Reddit experience, with monthly Coins</Text>
        </Stack>
      </Flex>
      <Button height="30px" bg="brand.100">
        Try Now
      </Button>
    </Flex>
  );
};
export default Premium;
