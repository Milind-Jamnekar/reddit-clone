import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  DirectoryMenuItem,
  directoryMenuState,
} from "../atoms/directoryMenuItem";
const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);

  const router = useRouter();

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router.push(menuItem.link);
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  return {
    directoryState,
    setDirectoryState,
    toggleMenuOpen,
    onSelectMenuItem,
  };
};

export default useDirectory;
