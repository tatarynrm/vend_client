import React, { useEffect, useState } from "react";
import "./LoginForm.scss";
import axios from "../../../utils/axios";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../../redux/slices/auth";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
const LoginForm = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(fetchAuth(formData));
      if (!data.payload || data.payload.length === 0) {
        return alert("Не вдалось авторизуватись");
      }

      if (data.payload.token) {
        window.localStorage.setItem("token", data.payload.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [token]);

  //   if (token) {
  //     return navigate("/");
  //   }
  return (
    <form display onSubmit={signIn} className="login__form">
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>

      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="pasword"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
        />
        {/* <FormHelperText>Password input</FormHelperText> */}
      </FormControl>

      <Box display={"flex"} gap={'10px'} marginTop={"20px"} justifyContent={"space-between"}>
        <Button type="submit" className="normal">
          Увійти
        </Button>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
