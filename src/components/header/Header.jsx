import React, { useEffect, useState } from "react";
import "./Header.scss";
import DarkMode from "../darkMode/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { logoutFromAccount } from "../../services/userServices";
import { logout } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = useSelector((state) => state.auth.data);
  const [userOptions, setUserOptions] = useState(false);
  const logoutFromAccount = () => {
    dispatch(logout());
    window.localStorage.clear();
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="header__inner container">
        {userData ? <div className="logo">LOGO</div> : null}
        {userData ? <div className="navigation">NAVIGATION</div> : null}
        <DarkMode />
        {userData ? (
          <div
            onClick={() => setUserOptions((val) => !val)}
            className="user__avatar"
          >
            {userData?.name.charAt(0)}.{userData?.surname}
          </div>
        ) : null}
        {userOptions && (
          <div className="user__options">
            <p>{userData?.email}</p> <br />
            <p>{userData?.tel}</p>
            <button onClick={logoutFromAccount} className="normal">
              Вийти з аккаунту.
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
