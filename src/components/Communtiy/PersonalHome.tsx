import {
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaReddit } from "react-icons/fa";
import useDirectory from "../../hooks/useDirectory";
import { CreateCommunityModal } from "../Modal/Community/CreateCommuntityModal";

const PersonalHome = () => {
  const bg = useColorModeValue("white", "gray.700");
  const borderBg = useColorModeValue("gray.300", "gray.600");

  const { toggleMenuOpen } = useDirectory();

  const [isOpen, setOpen] = useState(false);
  return (
    <Flex
      direction="column"
      bg={bg}
      borderRadius={4}
      border="1px solid"
      borderColor={borderBg}
      position="sticky"
    >
      <CreateCommunityModal open={isOpen} handleClose={() => setOpen(false)} />

      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/redditPersonalHome.png)"
        backgroundSize="cover"
      ></Flex>
      <Flex direction="column" p="12px">
        <Flex align="center" mb={2}>
          <Icon as={FaReddit} fontSize={50} color="brand.100" mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="9pt">
            Your personal Reddit frontpage, built for you.
          </Text>
          <Button height="30px" onClick={() => toggleMenuOpen()}>
            Create Post
          </Button>
          <Button variant="outline" height="30px" onClick={() => setOpen(true)}>
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
export default PersonalHome;
