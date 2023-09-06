import React, { useEffect, useState } from "react";
import './Users.scss'
import axios from "../../utils/axios";
const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const data = await axios("/user");
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
{users.length > 0 && <div className="users__list">

    <div className="name">ПІБ</div>
    <div className="name">Логін</div>
    <div className="name">Пароль</div>
    <div className="name">Номер телефону</div>
    <div className="name">Компанія</div>
</div> }

        {users.length > 0 ? 
        
        users?.map((item, idx) => {
            return (
              <div key={idx} className={`user user-${item.id}`}>
                <div className="pip">
                  {item.surname} {item.name} {item.last_surname}
                </div>
                <div>{item.email}</div>
                <div>{item.password}</div>
                <div>{item.tel}</div>
                <div>{item.company_id? "Підключено" : "Не підключено"}</div>
              </div>
            );
          })
          
          
          : null
          
          }
        

      </div>
    </div>
  );
};

export default Users;
