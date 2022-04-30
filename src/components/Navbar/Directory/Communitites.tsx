import { Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { CreateCommunityModal } from "../../Modal/Community/CreateCommuntityModal";

export const Communities: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={isOpen} handleClose={() => setOpen(false)} />
      <MenuItem gap={2} alignContent="center" onClick={() => setOpen(true)}>
        <Icon as={GrAdd} fontSize={20} />
        <Text fontSize="11pt">Communitites</Text>
      </MenuItem>
    </>
  );
};
