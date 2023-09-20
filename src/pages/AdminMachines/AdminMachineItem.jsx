import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/uk";
import { smsStatusUser } from "../../services/smsServices";
const AdminMachineItem = ({ item, idx, setSmsStatusInfo }) => {
  const userData = useSelector((state) => state.auth.data);
  const [collapse, setCollapse] = useState(false);
  const [adminFunctions, setAdminFunctions] = useState(false);
  const [formData, setFormData] = useState({});
  const [priceForLitter, setPriceForLitter] = useState("");
  const [liters, setLiters] = useState(1);
  const [newPin,setNewPin] = useState(null)

  const handlePriceForLiter = (event) => {
    // Ensure the input value is not negative
    const inputValue = event.target.value;
    if (inputValue === "" || parseFloat(inputValue) >= 0) {
      setPriceForLitter(inputValue);
    }
  };

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
      const data = await axios.post("/machine/delete", { id: item.machine_id });
      if (data.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const restartModule = async (smsStatus, smsInfo) => {
    try {
      if (window.confirm("Перезавантажити модуль?")) {
        const result = await axios.post("/msg/module-restart", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            userData,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(
            `GSM модуль перезавантажено. ${moment(new Date()).format("LLL")}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const collectCash = async (smsStatus, smsInfo, liters) => {
    try {
      if (window.confirm("Collect Cash?")) {
        const result = await axios.post("/msg/collect-cash", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            liters,
            userData,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(
            `Collect Cash. Успішно.${moment(new Date()).format("LLL")}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const priceForLiter = async (smsStatus, smsInfo, priceForLiter) => {
    try {
      if (window.confirm(`Встановити нову ціну ?`)) {
        const result = await axios.post("/msg/set-price", {
          data: {
            priceForLiter,
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            userData,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(
            `Ціну за літр змінено.${moment(new Date()).format("LLL")}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getInfo = async (smsStatus, smsInfo) => {
    try {
      if (window.confirm(`Встановити нову ціну ?`)) {
        const result = await axios.post("/msg/get-info", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            userData,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(
            `Опцію Get Info виконано.${moment(new Date()).format("LLL")}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addLiters = async (smsStatus, smsInfo, liters) => {
    try {
      if (window.confirm(`Видати ${liters} літрів води?`) & +liters <= 70) {
        const result = await axios.post("/msg", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            liters: liters ? liters : 0,
            userData,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(
            `Видано літрів:${liters}.${moment(new Date()).format("LLL")}`
          );
        }
      }if (+liters > 70) {
        window.alert('Завелика кількість літрів')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changePin = async (smsStatus, smsInfo, pin) => {
    try {
      if (window.confirm(`Змінити пін код на ${newPin}`) & +liters <= 70) {
        const result = await axios.post("/msg/change-pin", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            pin:pin,
            userData,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(
            `Змінено пін:${newPin}.${moment(new Date()).format("LLL")}`
          );
        }
      }if (newPin === null ) {
        window.alert('Невірний пін')
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
            <input
              type="text"
              name="address"
              placeholder="Адреса"
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
            <input
              type="text"
              name="machine_pin"
              placeholder="Пін код"
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
          <button
            onClick={() => deleteMachine(item)}
            style={{ backgroundColor: "red" }}
            className="normal"
          >
            Видалити
          </button>
        </div>
      ) : null}
      {adminFunctions ? (
        <div className="admin__functions">
          <div className="form__control">
            <div></div>
            <button onClick={() => restartModule(2, item)} className="normal">
              Перезавантажити GSM MODULE
            </button>
          </div>
          <div className="form__control">
            <div></div>
            <button onClick={() => collectCash(3, item)} className="normal">
              Collect Cash
            </button>
          </div>
          <div className="form__control">
            <div></div>
            <button onClick={() => getInfo(6, item)} className="normal">
              Get Info
            </button>
          </div>
          <div className="form__control">
            <input type="text" onChange={(e)=>setNewPin(e.target.value)}/>
            <button onClick={()=>changePin(5,item,newPin)} className="normal">Змінити пін</button>
          </div>

          <div className="form__control">
            <input type="text" placeholder="38098...." />
            <button className="normal">Номер модуля</button>
          </div>
          <div className="form__control">
            <input
              type="number"
              placeholder="150"
              min={50}
              max={500}
              value={priceForLitter}
              onChange={(e) => setPriceForLitter(e.target.value)}
            />
            <button
              onClick={(e) => priceForLiter(4, item, priceForLitter)}
              className="normal"
            >
              Встановити ціну за літр
            </button>
          </div>
          <div className="form__control">
            <input
              type="number"
              min={1}
              max={70}
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
            />
            <button onClick={() => addLiters(1, item, liters)} className="normal">
              Видати воду
            </button>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default AdminMachineItem;
