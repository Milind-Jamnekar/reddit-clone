import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
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
    <Flex direction="column" gap={{ base: "4" }}>
      <CreateCommunityModal open={isOpen} handleClose={() => setOpen(false)} />
      <Box>
        <Text
          pl={{ base: 0, sm: 3 }}
          mb={2}
          fontSize={{ base: "14pt", sm: "8pt" }}
          fontWeight={500}
          color="gray.600"
        >
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
      <Box>
        <Text
          pl={{ base: 0, sm: 3 }}
          fontSize={{ base: "14pt", md: "8pt" }}
          mb={1}
          fontWeight={500}
          color="gray.600"
        >
          MY Communities
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          gap={2}
          alignContent="center"
          // justifyContent="center"
          onClick={() => setOpen(true)}
          padding="10px 10px 10px 0px"
          pl={{ base: 0, sm: 2 }}
          mb={{ base: 2, sm: 0 }}
        >
          <Icon ml={3} as={GrAdd} fontSize={20} />
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
    </Flex>
  );
};
