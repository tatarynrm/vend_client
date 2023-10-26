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
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
const LoginForm = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
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
    <form onSubmit={signIn} className="login__form">
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

      <FormControl marginTop={'10px'}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
      
        <Input
          type={show ? "text" : "password"}
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
        />
              <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
      </InputGroup>
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
