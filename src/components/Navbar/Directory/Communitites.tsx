import { Box, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { CommunityState } from "../../../atoms/communitiesAtom";
import { CreateCommunityModal } from "../../Modal/Community/CreateCommuntityModal";
import MenuListItem from "./MenuListItems";

export const Communities: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const snippets = useRecoilValue(CommunityState).mySnippets;
  return (
    <>
      <CreateCommunityModal open={isOpen} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="8pt" fontWeight={500} color="gray.6 00">
          Moderating
        </Text>
        {snippets
          .filter((snippet) => snippet.isMod)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              imageURL={snippet.profileImageURL}
              iconColor="blue.500"
              link={`/r/${snippet.communityId}`}
              displayText={"r/" + snippet.communityId}
              icon={FaReddit}
            />
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="8pt" fontWeight={500} color="gray.6 00">
          MY Communities
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          gap={2}
          alignContent="center"
          onClick={() => setOpen(true)}
        >
          <Icon as={GrAdd} fontSize={20} />
          <Text fontSize="11pt">Communitites</Text>
        </MenuItem>
        {snippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            imageURL={snippet.profileImageURL}
            iconColor="blue.500"
            link={`/r/${snippet.communityId}`}
            displayText={"r/" + snippet.communityId}
            icon={FaReddit}
          />
        ))}
      </Box>
    </>
  );
};
