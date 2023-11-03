import React, { useEffect, useState } from "react";
import "./Header.scss";
import DarkMode from "../darkMode/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  useColorMode,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  UnlockIcon,
} from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
        {userData ? (
          <div className="logo">
            <NavLink to={"/"}>
              <Button>VEND MARKET</Button>
            </NavLink>
          </div>
        ) : null}
        {userData ? (
          <div className="navigation">
            {userData?.role === 1 ? (
              <div className="header__menu header__menu-admin">
                <NavLink to={"/users"}>
                  <Button>Користувачі</Button>
                </NavLink>
                <NavLink to={"/clients"}>
                  <Button>Клієнти</Button>
                </NavLink>
                <NavLink to={"/machines"}>
                  <Button>Апарати</Button>
                </NavLink>
                <NavLink to={"/sms"}>
                  <Button>SMS</Button>
                </NavLink>
              </div>
            ) : (
              <div className="header__menu header__menu-user">
                <NavLink to={"/my-machines"}>
                  <Button> Мої апарати</Button>
                </NavLink>
              </div>
            )}
          </div>
        ) : null}
        {/* <DarkMode /> */}

        {userData ? (
          <Menu>
            <MenuButton cursor={"pointer"} as={Avatar}>
              {/* {userData?.name?.charAt(0)}.{userData?.surname} */}
            </MenuButton>
            <MenuList>
              <Divider />
              <MenuItem>
                <a href="tel:0958009195">Технічна підтримка</a>
              </MenuItem>
              <MenuItem>0958009195</MenuItem>
              <Divider />
              <Divider height={"10px"} />
              <MenuItem onClick={toggleColorMode}>
                <Button>
                  Змінити тему
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </MenuItem>
              <Divider />
              <Divider />
              <Divider />
              <MenuItem>
                <Box>
                  <Text>Ваш баланс складає: {userData?.balance} грн</Text>
                  <Button colorScheme="green">Поповнити баланс</Button>
                </Box>
              </MenuItem>
              <Divider />
              <Divider />
              <Divider />
              <MenuItem
                _hover={{ backgroundColor: "red.300" }}
                onClick={logoutFromAccount}
              >
                <Text>Вийти</Text>
                <UnlockIcon marginLeft={"5px"} />
              </MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
