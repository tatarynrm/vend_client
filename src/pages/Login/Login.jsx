import React from "react";
import "./Login.scss";
import LoginForm from "../../components/forms/login/LoginForm";
import axios from "../../utils/axios";
import { Stack } from "@chakra-ui/react";
const Login = () => {
  return (
    <Stack
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <LoginForm />
    </Stack>
  );
};

export default Login;
