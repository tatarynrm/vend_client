import React from "react";
import "./Home.scss";
import { logout } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutFromAccount = () => {
    dispatch(logout());
    window.localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="home">
      <div className="home__inner container">Головна сторінка</div>

    </div>
  );
};

export default Home;
