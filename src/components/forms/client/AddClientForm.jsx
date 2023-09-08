import React, { useState } from "react";
import "./AddClientForm.scss";
import axios from '../../../utils/axios'
const AddClientForm = () => {
  const [resultMsg, setResultMsg] = useState("");
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    company_name: "",
    director_name: "",
    director_surname: "",
    director_last_surname: "",
    company_code: "",
    legal_address: "",
    phone_number: "",
  });
  console.log(formData);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
        if (
            formData.company_name === "" ||
            formData.director_name === "" ||
            formData.director_surname === "" ||
            formData.director_last_surname === "" ||
            formData.company_code === "" ||
            formData.legal_address === "" ||
            formData.phone_number === "" 
          ) {
            alert("Заповніть усі поля");
          } else {
            const data = await axios.post("/client/new-client", formData);
            if (data.status === 200) {
              setResultMsg("Створено клієнта");
            } else if (data.status === 201) {
              setResultMsg("Клієнт з таким ІПН / ЄРДПОУ вже існує");
            }
          }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <form className="add__client-form" onSubmit={handleSubmitForm}>
      <div className="form__control">
        <input
          type="text"
          name="company_name"
          placeholder="Назва компанії"
          value={formData.company_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="director_surname"
          placeholder="Прізвище директора"
          value={formData.director_surname}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="director_name"
          placeholder="Ім'я директора"
          value={formData.director_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="director_last_surname"
          placeholder="По-батькові"
          value={formData.director_last_surname}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="company_code"
          placeholder="ЄРДПОУ / ІПН"
          value={formData.company_code}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="legal_address"
          placeholder="Адреса"
          value={formData.legal_address}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="phone_number"
          placeholder="Номер телефону"
          value={formData.phone_number}
          onChange={handleInputChange}
        />
      </div>

      <button className="normal">Додати клієнта</button>
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

export default AddClientForm;
