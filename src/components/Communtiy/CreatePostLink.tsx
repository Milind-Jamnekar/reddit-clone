import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { auth } from "../../firebase/clientApp";
import useDirectory from "../../hooks/useDirectory";

const CreatePostLink: FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();
  const bg = useColorModeValue("white", "blackAlpha.600");
  const inputBg = useColorModeValue("white", "blackAlpha.300");
  const { colorMode } = useColorMode();
  const onClick = () => {
    // Could check for user to open auth modal before redirecting to submit
    const { communityId } = router.query;

    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return;
    }

    // router.push(`${communityId}/submit`);
    // Open directory menu to select community to post to
    toggleMenuOpen();
  };

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg={bg}
      height="56px"
      borderRadius={5}
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
      p={2}
      gap={3}
      mb={8}
      position="relative"
      boxShadow="lg"
    >
      {user?.photoURL ? (
        <Image
          src={user.photoURL as string}
          width="40px"
          height="40px"
          borderRadius="full"
          alt={`${user.displayName} profile image`}
          fallbackSrc="https://styles.redditmedia.com/t5_2683ei/styles/profileIcon_snoo447a9f26-c901-4e3c-8514-1ae2f46aa9d4-headshot-f.png?width=256&height=256&crop=256:256,smart&s=9eba0577229c81e9d64e68c085f11f5e97e8f455"
        />
      ) : (
        <Icon as={FaReddit} fontSize={36} color="gray.300" />
      )}
      <Box
        w="14px"
        h="14px"
        bg="green.400"
        borderRadius="full"
        border="2px solid white"
        position="absolute"
        bottom="6px"
        left="34px"
      />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          // bg: { c  olorMode === 'light' ? "white" : 'blackAlpha.600'},
          bg: { inputBg },
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: { inputBg },
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={colorMode === "light" ? "gray.50" : "blackAlpha.300"}
        borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
        height="36px"
        borderRadius={5}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  );
};
export default CreatePostLink;
