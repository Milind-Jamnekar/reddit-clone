import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import * as React from "react";
import { FaReddit } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { Community } from "../../atoms/communitiesAtom";
import { useCommunityData } from "../../hooks/useCommunityData";

interface IHeaderProps {
  communityData: Community;
}

const Header: React.FC<IHeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <>
      <Flex direction="column" width="100%" height="220px">
        <Box height="70%" bg="blue.400" overflow="hidden">
          {communityData.bgImageURL ? (
            <Image
              src={communityData.bgImageURL}
              objectFit="cover"
              width="100%"
              height="full"
              loading="lazy"
              alt={`r${communityData.id} background image`}
            />
          ) : null}
        </Box>
        <Flex justify="center" bg="white" flexGrow={1}>
          {/* Community Image  */}
          <Flex width="95%" maxWidth="860px" gap={2}>
            {communityStateValue.currentCommunity?.profileImageURL ? (
              <Image
                src={communityStateValue.currentCommunity?.profileImageURL}
                width="72px"
                height="72px"
                margin="-20px 0px 0px"
                borderRadius="50%"
                border="4px solid white"
                alt={`community ${communityData.id} profile image`}
              />
            ) : (
              <Icon
                as={FaReddit}
                fontSize="7xl"
                position="relative"
                top={-3}
                color="blue.400"
                border="4px solid white"
                borderRadius="50%"
                background="white"
              />
            )}
            <Flex justify="space-between" flexGrow={1}>
              {/* Community Name  */}
              <Flex direction="column">
                <Text fontSize="2xl" fontWeight={700}>
                  {communityData.id}{" "}
                </Text>
                <Text fontSize="10pt" color="gray.400">
                  r/{communityData.id}{" "}
                </Text>
              </Flex>
              {/* Join button  */}
              <Flex direction="row" gap={2}>
                <Button
                  height="28px"
                  // display={{ base: "none", sm: "flex" }}
                  width={{ base: "70px", md: "110px" }}
                  variant={isJoined ? "solid" : "outline"}
                  mt={2}
                  px={4}
                  isLoading={loading}
                  onClick={() =>
                    onJoinOrLeaveCommunity(communityData, isJoined)
                  }
                >
                  {isJoined ? "Joined" : "Join"}
                </Button>
                <Button
                  height="28px"
                  width="28px"
                  // display={{ base: "none", sm: "flex" }}
                  variant={isJoined ? "solid" : "outline"}
                  mt={2}
                  borderRadius="1243px"
                >
                  <Icon as={BsBellFill} />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
