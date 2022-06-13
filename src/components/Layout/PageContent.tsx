import { Flex } from "@chakra-ui/react";

export interface IPageContentProps {
  //   children: JSX.Element[] | JSX.Element;
  children: React.ReactNode[] | React.ReactNode;
}

export default function PageContent({ children }: IPageContentProps) {
  return (
    <Flex justify="center" p="20px 0px">
      <Flex width="95%" maxWidth="960px" justify="center">
        {/* Left hand side  */}
        <Flex
          direction="column"
          width={["100%", "65%"]}
          flexGrow={[0, 1]}
          mr={[0, 6]}
        >
          {" "}
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* Right hande side  */}
        <Flex
          direction="column"
          display={["none", "null", "flex"]}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
}
