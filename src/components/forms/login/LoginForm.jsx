import React, { useEffect, useState } from "react";
import "./LoginForm.scss";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../../redux/slices/auth";
const LoginForm = () => {
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
      <div className="form__control">
        <label>Login</label>
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <label>Password</label>
        <input
          type="pasword"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
        />
      </div>

      <button className="normal">Увійти</button>
    </form>
  );
};

export default LoginForm;
