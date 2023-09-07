import React, { useEffect, useState } from "react";
import "./Header.scss";
import DarkMode from "../darkMode/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth";
import { Link, useNavigate } from "react-router-dom";
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
          <Link className="normal" to={'/'} >VEND MARKET</Link>
        </div> : null}
        {userData ? (
          <div className="navigation">
            {userData?.role === 1 ? (
              <div className="header__menu header__menu-admin">
                <Link to={'/users'} className="normal">Користувачі</Link>
                <Link to={'/clients'} className="normal">Клієнти</Link>
                <Link to={'/machines'} className="normal">Апарати</Link>
                <Link to={'/sms'} className="normal">SMS</Link>
              </div>
            ) : (
              <div className="header__menu header__menu-user">
                <Link to={'/my-machines'} className="normal">Мої апарати</Link>
              </div>
            )}
          </div>
        ) : null}
        <DarkMode />
        {userData ? (
          <div
            onClick={() => setUserOptions((val) => !val)}
            className="user__avatar"
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
