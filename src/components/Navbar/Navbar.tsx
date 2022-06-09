import { Flex, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { defaultMenuItem } from "../../atoms/directoryMenuItem";
import { auth } from "../../firebase/clientApp";
import useDirectory from "../../hooks/useDirectory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Directory = dynamic(() => import("./Directory/Directory"));

const Navbar: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("white", "blackAlpha.800");

  return (
    <Flex
      gap={2}
      bg={bg}
      h="50px"
      padding="6px 12px"
      align="center"
      boxShadow="lg"
      justifyContent={user ? "space-between" : "center"}
    >
      <Flex
        align="center"
        justify="center"
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image src="/images/redditFace.svg" h="30px" alt="Reddit Face logo" />
        <Image
          src={
            colorMode === "light"
              ? "/images/redditText.svg"
              : "/images/Reddit-Word-Dark.svg"
          }
          h="46px"
          display={{ base: "none", md: "unset" }}
          alt="Reddit text logo"
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
