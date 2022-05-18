import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface IMenuListItemProps {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor?: string;
  imageURL?: string;
}

const MenuListItem: React.FC<IMenuListItemProps> = ({
  imageURL,
  iconColor,
  link,
  icon,
  displayText,
}) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, imageURL, iconColor })
      }
    >
      <Flex align="center">
        {imageURL ? (
          <Image
            src={imageURL}
            borderRadius="full"
            boxSize="35px"
            mr={2}
            alt={`${displayText} profile image`}
          />
        ) : (
          <Icon as={icon} fontSize={35} mr={2} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
