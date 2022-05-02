import { Flex } from "@chakra-ui/react";
import * as React from "react";

export interface IPageContentProps {
  //   children: JSX.Element[] | JSX.Element;
  children: React.ReactNode[] | React.ReactNode;
}

export default function PageContent({ children }: IPageContentProps) {
  return (
    <Flex justify="center" p="16px 0px" border="1px solid red">
      <Flex
        width="95%"
        maxWidth="860px"
        justify="center"
        border="1px solid green"
      >
        {/* Left hand side  */}
        <Flex
          direction="column"
          width={["100%", "65%"]}
          border="2px solid yellow"
          mr={[0, 6]}
        >
          {" "}
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* Right hande side  */}
        <Flex
          direction="column"
          display={["none", "flex"]}
          flexGrow={1}
          border="1px solid orange"
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
}
