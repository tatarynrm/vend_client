import React, { useState } from 'react'
import './AddMachineForm.scss'
import axios from '../../../utils/axios'
const AddMachineForm = () => {
    const [resultMsg, setResultMsg] = useState("");
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
      machine_id: null,
      address: "",
      company_id: "" || null,
      machine_phone: "",
      terminal_sim: "",
      machine_pin: "",

    });
    console.log(formData);
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (
                formData.machine_id === "" ||
                formData.address === ""
                // formData.company_id === "" ||
                // formData.machine_phone === "" ||
                // formData.terminal_sim === "" ||
                // formData.machine_pin === "" 
     
              ) {
                alert("Заповніть усі поля");
              } else {
                const data = await axios.post("/machine/new-machine", formData);
                if (data.status === 200) {
                  setResultMsg("Створено апарат");
                } else if (data.status === 201) {
                  setResultMsg("Апарат з таким кодом вже існує");
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
    <form onSubmit={handleSubmitForm} className='add__machine-form'>
      <div className="form__control">
        <input
          type="text"
          name="machine_id"
          placeholder="Код апарату"
          required={true}
          value={formData.machine_id}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="address"
          required={true}
          placeholder="Адреса"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="company_id"
          placeholder="Компанія"
          value={formData.company_id}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="machine_phone"
          placeholder="Сім.номер терміналу"
          required={true}
          value={formData.machine_phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="terminal_sim"
          placeholder="Додатковий номер"
          value={formData.terminal_sim}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__control">
        <input
          type="text"
          name="machine_pin"
          placeholder="ПІН"
          value={formData.machine_pin}
          onChange={handleInputChange}
        />
      </div>
      <button className='normal'>Додати апарат</button>
      {resultMsg && (
        <span
          style={{ color: resultMsg.includes("Створено") ? "green" : "red" }}
        >
          {resultMsg}
        </span>
      )}

    </form>
  )
}

export default AddMachineForm