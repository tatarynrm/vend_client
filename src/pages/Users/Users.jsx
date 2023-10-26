import React, { useEffect, useState } from "react";
import "./Users.scss";
import axios from "../../utils/axios";
import { PiUserPlusFill } from "react-icons/pi";
import { TbUserX } from "react-icons/tb";
import UserItem from "./UserItem";
import AddUser from "./AddUser";
import { Input } from "@chakra-ui/react";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [addNewUser, setAddNewUser] = useState(false);
  const [search, setSearch] = useState("");
  const getAllUsers = async () => {
    try {
      const data = await axios("/user");
      console.log(data.data);
      if (data.status === 200) {
        setUsers(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="users page">
      <div className="users__inner container">
        {addNewUser ? (
          <TbUserX
            onClick={() => setAddNewUser((val) => !val)}
            style={{ cursor: "pointer" }}
            size={40}
          />
        ) : (
          <PiUserPlusFill
            onClick={() => setAddNewUser((val) => !val)}
            style={{ cursor: "pointer" }}
            size={40}
          />
        )}
        {addNewUser ? <AddUser /> : null}
        <div className="search">
          <Input
            type="text"
            placeholder="Пошук"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {users.length > 0 && (
          <div className="users__list">
            <div className="name">ПІБ</div>
            <div className="name">Логін</div>
            <div className="name">Пароль</div>
            <div className="name">Номер телефону</div>
            <div className="name">Компанія</div>
            <div className="name">Редагувати</div>
          </div>
        )}

        {users.length > 0
          ? users
              ?.filter((item) => item.email !== null)
              .filter((item) =>
                search.toLocaleLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search) ||
                    item.name.toUpperCase().includes(search) ||
                    item.surname.toLowerCase().includes(search) ||
                    item.surname.toUpperCase().includes(search) ||
                    item.email.toLowerCase().includes(search) ||
                    item.email.toUpperCase().includes(search) ||
                    item.tel.toLowerCase().includes(search) ||
                    item.tel.toUpperCase().includes(search) 
              )
              .map((item, idx) => {
                return <UserItem key={idx} item={item} />;
              })
          : null}
      </div>
    </div>
  );
};

export default Users;
