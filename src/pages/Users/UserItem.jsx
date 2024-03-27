import React, { useEffect, useState } from "react";
import { FcHighPriority } from "react-icons/fc";
import moment from "moment";
import "moment/locale/uk";
import axios from "../../utils/axios";
import { Button, Input, Stack } from "@chakra-ui/react";
const UserItem = ({ item }) => {
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
        id: item.id,
      });
    }
  }, [collapse]);
  const editUser = async () => {
    try {
      const data = await axios.post("/user/update", formData);
      if (data.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (item) => {
    try {
      if (window.confirm("Ви дійсно хочете видалити користувача?")) {
        const data = await axios.post("/user/delete", { id: +item.id });

        if (data.status === 200) {
          window.alert("Успішно видалено користувача");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
// const cancelActiveFalse = async (value)=>{
//   try {
// if (window.confirm(`Зняти обмеження з користувача ${item.surname}?`)) {
//   const data = await axios.post('/user/cancel-active',{id:item.id})
//    if (data.status === 200) {
//     window.location.reload()
//    }
// }
//   } catch (error) {
//     console.log(error);
//   }
// }
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
        <Stack >
          <Button onClick={() => setCollapse((val) => !val)}>
            {collapse ? "Приховати" : "Переглянути/Змінити"}
          </Button>
          {/* {item?.active === 0 && <Button onClick={()=>cancelActiveFalse(item.id)} colorScheme="red" width={"100%"}>Зняти обмеження</Button>} */}
        </Stack>
      </div>

      {collapse && (
        <div className="user__functions">
          <div className="form__control">
            <Input
              type="text"
              placeholder="Прізвище"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              placeholder="Ім'я"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              placeholder="По-батькові"
              name="last_surname"
              value={formData.last_surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              placeholder="Логін"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              placeholder="Пароль"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              placeholder="Пароль"
              name="tel"
              value={formData.tel}
              onChange={handleInputChange}
            />
          </div>
          <Button
            fontSize={12}
            whiteSpace={"pre-wrap"}
            onClick={editUser}
            className="normal"
          >
            Редагувати
          </Button>
          <Button
            fontSize={12}
            whiteSpace={"pre-wrap"}
            onClick={() => deleteUser(item)}
            className="normal"
            colorScheme="red"
          >
            Видалити
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserItem;
