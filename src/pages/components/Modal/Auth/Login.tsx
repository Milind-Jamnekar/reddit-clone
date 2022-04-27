import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { motion } from "framer-motion";

const variants = {
  enter: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const Login: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Update input Data
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = () => {};
  return (
    <motion.div
      initial="enter"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      <form onSubmit={onSubmit}>
        <Input
          required
          name="email"
          placeholder="Email"
          type="email"
          mb={3}
          onChange={onChange}
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
        />
        <Input
          required
          name="password"
          placeholder="Password"
          type="password"
          mb={3}
          onChange={onChange}
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
        />
        <Button type="submit" width="100%" h="36px" mb={2}>
          Submit
        </Button>
        <Flex fontSize="10pt" gap={1} justify="center">
          <Text>New here ?</Text>
          <Text
            color="blue.600"
            fontWeight="700"
            cursor="pointer"
            onClick={() =>
              setModalState((prev) => ({
                ...prev,
                view: "signup",
              }))
            }
          >
            SIGN UP
          </Text>
        </Flex>
      </form>
    </motion.div>
  );
};
export default Login;
