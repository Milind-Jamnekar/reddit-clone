import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";

//Icons
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
type UserMenuProps = {
  user?: User | null;
};

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="3px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.300" }}
      >
        <Flex align="center">
          {user ? (
            <>
              <Icon as={FaRedditSquare} fontSize={27} color="gray.300" />
              <ChevronDownIcon fontSize={22} />
            </>
          ) : (
            <Icon as={VscAccount} fontSize={25} color="gray.300" />
          )}
        </Flex>
      </MenuButton>
      <MenuList mt={2}>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "blue.600", color: "white" }}
            >
              <Flex gap={2}>
                <Icon as={CgProfile} fontSize={25} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "blue.600", color: "white" }}
              onClick={() => signOut(auth)}
            >
              <Flex gap={2}>
                <Icon as={MdOutlineLogin} fontSize={25} />
                Signout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontSize="10pt"
            fontWeight="700"
            _hover={{ bg: "blue.600", color: "white" }}
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
