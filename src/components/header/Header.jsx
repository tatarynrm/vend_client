import React, { useEffect, useState } from "react";
import "./Header.scss";
import DarkMode from "../darkMode/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
      <div     className="header__inner container">
        {userData ? <div className="logo">
          <NavLink className="normal" to={'/'} >VEND MARKET</NavLink>
        </div> : null}
        {userData ? (
          <div className="navigation">
            {userData?.role === 1 ? (
              <div className="header__menu header__menu-admin">
                <NavLink to={'/users'} className="normal">Користувачі</NavLink>
                <NavLink to={'/clients'} className="normal">Клієнти</NavLink>
                <NavLink to={'/machines'} className="normal">Апарати</NavLink>
                <NavLink to={'/sms'} className="normal">SMS</NavLink>
              </div>
            ) : (
              <div className="header__menu header__menu-user">
                <NavLink to={'/my-machines'} className="normal">Мої апарати</NavLink>
              </div>
            )}
          </div>
        ) : null}
        <DarkMode />
        {userData ? (
          <div
            onClick={() => setUserOptions((val) => !val)}
            className="normal"
          >
            {userData?.name?.charAt(0)}.{userData?.surname}
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
