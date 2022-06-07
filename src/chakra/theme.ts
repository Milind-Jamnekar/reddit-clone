import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { Button } from "./button";

export const theme = extendTheme({
  initialColorMode: "system",
  useSystemColorMode: true,
  colors: {
    brand: { 100: "#ff3c00" },
  },
  fonts: {
    body: "Open Sans, sans-sarif",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "light" ? "gray.200" : "blackAlpha.700",
      },
    }),
  },
  components: {
    Button,
  },
});
