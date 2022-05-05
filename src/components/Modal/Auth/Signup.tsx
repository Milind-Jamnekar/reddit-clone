import { Input, Button, Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import { firebaseErrors } from "../../../firebase/firebaseErrors";

const variants = {
  enter: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const Signup: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  // Input Changing event handler
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Update input Data
    setSignUp((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //Form submission event handler
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // password match check
    if (signUp.password !== signUp.confirmPassword) {
      setError("Password doesn't match 🙄");
      return;
    }
    // sends data to athenticate
    createUserWithEmailAndPassword(signUp.email, signUp.password);
  };

  const createUserDocument = async (user: User) => {
    const userCollectionRef = doc(firestore, "users", user.uid);
    await setDoc(userCollectionRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (user) {
      createUserDocument(user.user);
    }
  }, [user]);

  return (
    <motion.div
      initial="enter"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      <form onSubmit={onSubmit}>
        {/* Email input  */}
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
        {/* password input  */}
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
        {/* confirm password input  */}
        <Input
          required
          name="confirmPassword"
          placeholder="Confirm Password"
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
        {/* any error will be apear here  */}
        <Text textAlign="center" fontSize="10pt" color="red.500" mb="5px">
          {error ||
            firebaseErrors[userError?.message as keyof typeof firebaseErrors]}
        </Text>

        {/* Submit button  */}
        <Button type="submit" width="100%" h="36px" mb={2} isLoading={loading}>
          Submit
        </Button>

        {/* redirect to login component  */}
        <Flex fontSize="10pt" gap={1} justify="center">
          <Text>Already redditor ?</Text>
          <Text
            color="blue.600"
            fontWeight="700"
            cursor="pointer"
            onClick={() =>
              setModalState((prev) => ({
                ...prev,
                view: "login",
              }))
            }
          >
            LOGIN IN
          </Text>
        </Flex>
      </form>
    </motion.div>
  );
};

export default Signup;
