import React, { useEffect, useState } from "react";
import "./AddUserForm.scss";
import axios from "../../../utils/axios";
const AddUserForm = () => {
  const [resultMsg, setResultMsg] = useState("");
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    last_surname: "",
    email: "",
    password: "",
    tel: "",
    company_id: "" || 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmitUser = async (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.surname === "" ||
      formData.last_surname === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.tel === "" ||
      formData.company_id === "" 
    ) {
      alert("Заповніть усі поля");
    } else {
      const data = await axios.post("/user/new-user", formData);
      if (data.status === 200) {
        setResultMsg("Створено користувача");
      } else if (data.status === 201) {
        setResultMsg("Користувач з таким e-mail вже існує");
      }
    }

    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const data = await axios.get("/client");
        console.log(data);
        if (data.status === 200) {
            setCompanies(data.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllCompanies();
  }, []);

  console.log(formData);
  return (
    <form className="add__user-form" onSubmit={handleSubmitUser}>
      <div className="form__control">
        <input
          type="text"
          name="surname"
          placeholder="Прізвище"
          value={formData.surname}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="name"
          placeholder="Ім'я"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form__control">
        <input
          type="text"
          name="last_surname"
          placeholder="По батькові"
          value={formData.last_surname}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="tel"
          placeholder="Телефон"
          value={formData.tel}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        {/* <input
          type="text"
          name="company_id"
          placeholder="Компанія"
          value={formData.company_id}
          onChange={handleInputChange}
        /> */}
        <select onChange={handleInputChange}  name="company_id" value={formData.company_id}>
            <option value="">Оберіть компанію</option>
            {companies.length > 1 ?  
            companies.map((item,idx)=>{
             return <option key={idx} value={item.id}>{item.company_name}</option>   
            }) :null
            }
    
        </select>
      </div>
      <button type="submit" className="normal">
        Створити юзера
      </button>
      {resultMsg && (
        <span
          style={{ color: resultMsg.includes("Створено") ? "green" : "red" }}
        >
          {resultMsg}
        </span>
      )}
    </form>
  );
};

export default AddUserForm;
