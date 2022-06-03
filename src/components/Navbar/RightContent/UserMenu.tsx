import {
  Box,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
//Icons
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { CommunityState } from "../../../atoms/communitiesAtom";
import { auth } from "../../../firebase/clientApp";

type UserMenuProps = {
  user?: User | null;
};

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const resetCommunityState = useResetRecoilState(CommunityState);
  const setAuthState = useSetRecoilState(authModalState);

  const logout = async () => {
    await signOut(auth);
    // resetCommunityState();
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding={{ base: "3px 6px", md: "0px 6px" }}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.300" }}
      >
        <Flex align="center">
          {user ? (
            <>
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  width="30px"
                  height="30px"
                  borderRadius="full"
                  alt=""
                  mr={1}
                />
              ) : (
                <Icon
                  fontSize={28}
                  mr={1}
                  color="gray.300"
                  as={FaRedditSquare}
                />
              )}
              <Box
                display={{ base: "none", lg: "flex" }}
                flexDirection="column"
                fontSize="8pt"
                alignItems="flex-start"
                mr={8}
              >
                <Text fontSize={12} fontWeight={700}>
                  {user?.displayName || user?.email?.split("@")[0]}
                </Text>
                <Flex alignItems="center">
                  <Icon as={IoSparkles} color="brand.100" mr={1} />
                  <Text color="gray.400">1 karma</Text>
                </Flex>
              </Box>
            </>
          ) : (
            <Icon as={VscAccount} fontSize={25} color="gray.300" />
          )}
        </Flex>
      </MenuButton>
      <MenuList mt={2}>
        {user ? (
          <>
            <MenuItem fontSize="10pt" fontWeight="700">
              <Flex gap={2} align="center">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    width="30px"
                    height="30px"
                    borderRadius="full"
                    alt=""
                  />
                ) : (
                  <Icon as={CgProfile} fontSize={25} />
                )}
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem fontSize="10pt" fontWeight="700" onClick={logout}>
              <Flex gap={2} align="center">
                <Icon as={MdOutlineLogin} fontSize={25} />
                Signout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontSize="10pt"
            fontWeight="700"
            onClick={() => {
              setAuthState({ open: true, view: "login" });
            }}
          >
            <Flex gap={2}>
              <Icon as={MdOutlineLogin} fontSize={25} />
              Login in / Sign up
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
