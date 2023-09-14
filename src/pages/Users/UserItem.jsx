import React, { useEffect, useState } from "react";
import { FcHighPriority } from "react-icons/fc";
import moment from "moment";
import "moment/locale/uk";
import axios from "../../utils/axios";
const UserItem = ({ item }) => {
  console.log(item);
  const [formData, setFormData] = useState({
    // name: "",
    // surname: "",
    // last_surname: "",
    // email: "",
    // password: "",
    // tel: "",
    // company_id: "" || 0,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        surname: item.surname,
        last_surname: item.last_surname,
        email: item.email,
        password: item.password,
        tel: item.tel,
        id:item.id
      });
    }
  }, []);
  const editUser = async () => {
    try {
      const data = await axios.post("/user/update", formData);
      console.log(data);
      if (data.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (item)=>{
    try {
      const data = await axios.post('/user/delete',{id:+item.id});
      console.log(data);
      if (data.status === 200) {
        window.alert('Успішно видалено користувача')
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(+item.id);
  return (
    <React.Fragment>
      <div className={`user user-${item.id}`}>
        <div className="pip">
          {item.surname} {item.name} {item.last_surname}
        </div>
        <div>{item.email}</div>
        <div>{item.password}</div>
        <div>{item.tel}</div>
        <div>
          {item.company_id ? (
            <span style={{ cursor: "pointer" }}>{item.company_name}</span>
          ) : (
            <FcHighPriority title="Не підключено" />
          )}
        </div>
        <div>
          <button onClick={() => setCollapse((val) => !val)} className="normal">
            {collapse ? "Приховати" : "Переглянути/Змінити"}
          </button>
        </div>
      </div>

      {collapse && (
        <div className="user__functions">
          <div className="form__control">
            <input
              type="text"
              placeholder="Прізвище"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <input
              type="text"
              placeholder="Ім'я"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <input
              type="text"
              placeholder="По-батькові"
              name="last_surname"
              value={formData.last_surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <input
              type="text"
              placeholder="Логін"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <input
              type="text"
              placeholder="Пароль"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <input
              type="text"
              placeholder="Пароль"
              name="tel"
              value={formData.tel}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={editUser} className="normal">Редагувати</button>
          <button onClick={()=>deleteUser(item)} style={{ backgroundColor: "red" }} className="normal">
            Видалити
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserItem;
