import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { firebaseErrors } from "../../../firebase/firebaseErrors";

const variants = {
  enter: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const Login: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Update input Data
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");
    signInWithEmailAndPassword(login.email, login.password);
  };
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
        <Text textAlign="center" color="red.500" fontSize="10pt" mb="5px">
          {firebaseErrors[error?.message as keyof typeof firebaseErrors]}
        </Text>
        <Button type="submit" width="100%" h="36px" mb={2} isLoading={loading}>
          Submit
        </Button>
        <Flex justifyContent="center" mb={2}>
          <Text fontSize="9pt" mr={1}>
            Forgot your password ?
          </Text>
          <Text
            fontSize="9pt"
            color="blue.500"
            cursor="pointer"
            onClick={() => {
              setModalState((prev) => ({
                ...prev,
                view: "resetPassword",
              }));
            }}
          >
            Reset
          </Text>
        </Flex>
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
