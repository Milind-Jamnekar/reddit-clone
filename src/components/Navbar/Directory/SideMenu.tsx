import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useDirectory from "../../../hooks/useDirectory";
import { Communities } from "./Communitites";

function SideMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <>
      <Drawer
        placement="left"
        onClose={toggleMenuOpen}
        isOpen={directoryState.isOpen}
        size="xs"
      >
        <DrawerOverlay bg="none" backdropFilter="auto" backdropBlur="3px" />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Communities</DrawerHeader>
          <DrawerBody ml={1}>
            <Communities />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideMenu;
