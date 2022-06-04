import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useDirectory from "../../../hooks/useDirectory";

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
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideMenu;
