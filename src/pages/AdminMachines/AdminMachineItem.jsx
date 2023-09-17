import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
const AdminMachineItem = ({ item, idx }) => {
  const [collapse, setCollapse] = useState(false);
  const [adminFunctions,setAdminFunctions] = useState(false)
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (item) {
      setFormData({
        machine_id: item.machine_id,
        address: item.address,
        machine_phone: item.machine_phone,
        terminal_sim: item.terminal_sim,
        machine_pin: item.machine_pin,
      });
    }
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const editMachine = async () => {
    try {
      const data = await axios.post("/machine/edit", formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMachine = async (item) => {
    try {
      const data = await axios.post("/machine/delete", {id:item.machine_id});
      if (data.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div className="admin__machine-item">
        <div className="machine__id">{idx + 1}</div>
        <div className="machine__number">{item.machine_id}</div>
        <div>{item.address ? item.address : "Адресу не встановлено"}</div>
        <div>
          {item.machine_phone ? item.machine_phone : "Номер не встановлено"}
        </div>
        <div>{item.machine_pin ? item.machine_pin : "ПІН не налаштовано"}</div>
        <div>{item.company_name ? item.company_name : "Не підключено"}</div>
        <div>
          {item.terminal_sim ? item.terminal_sim : "Серв.номер не встановлено"}
        </div>
        <div>
          <button
            onClick={() => {
              setCollapse((val) => !val);
            }}
            className="normal"
          >
            {collapse ? "Приховати" : "Дивитись/Змінити"}
          </button>
          <button
            onClick={() => {
              setAdminFunctions((val) => !val);
            }}
            className="normal"
          >
            {adminFunctions ? "Приховати" : "Сервісні функції"}
          </button>
        </div>
      </div>
      {collapse ? (
        <div className="user__functions">
          <div className="form__control">
            <input
              type="text"
              name="machine_id"
              placeholder="Код машини"
              value={formData.machine_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <input type="text" name="address" placeholder="Адреса"
                        value={formData.address}
                        onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <input
              type="text"
              name="machine_phone"
              placeholder="Моб тел. апарату"
              value={formData.machine_phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <input type="text" name="machine_pin" placeholder="Пін код"
                     value={formData.machine_pin}
                     onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <input
              type="text"
              name="terminal_sim"
              placeholder="Сервісний номер"
              value={formData.terminal_sim}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={editMachine} className="normal">
            Редагувати
          </button>
          <button onClick={()=>deleteMachine(item)} style={{ backgroundColor: "red" }} className="normal">
            Видалити
          </button>
        </div>
      ) : null}
      {adminFunctions ? <div className="admin__functions">
       <div className="form__control">
        <input type="text" />
        <button className="normal">Змінити пін</button>
       </div>
       <div className="form__control">
        <input type="text" />
        <button className="normal">Перезавантажити модуль</button>
       </div>
       <div className="form__control">
        <div></div>
        <button className="normal">Collect Cash</button>
       </div>
       <div className="form__control">
        <input type="text" placeholder="38098...." />
        <button className="normal">Номер модуля</button>
       </div>
      </div> :null}
    </React.Fragment>
  );
};

export default AdminMachineItem;
