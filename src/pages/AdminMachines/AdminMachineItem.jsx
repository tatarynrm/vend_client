import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/uk";
import { smsStatusUser } from "../../services/smsServices";
import { Button, Input } from "@chakra-ui/react";
const AdminMachineItem = ({ item, idx, setSmsStatusInfo, companies }) => {
  const userData = useSelector((state) => state.auth.data);
  const [collapse, setCollapse] = useState(false);
  const [adminFunctions, setAdminFunctions] = useState(false);
  const [formData, setFormData] = useState({});
  const [priceForLitter, setPriceForLitter] = useState("");
  const [liters, setLiters] = useState(1);
  const [newPin, setNewPin] = useState();
  const [newNumber, setNewNumber] = useState("");
  const [newToken, setNewToken] = useState("");
  const [newAnthillAddress, setNewAnthillAddress] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [cahngeCompany, setChangeCompany] = useState([]);
  console.log(item);
  const handlePriceForLiter = (event) => {
    // Ensure the input value is not negative
    const inputValue = event.target.value;
    if (inputValue === "" || parseFloat(inputValue) >= 0) {
      setPriceForLitter(inputValue);
    }
  };
  const setNewCompany = (event) => {
    setChangeCompany([
      {
        company_name: event.target.options[event.target.selectedIndex].text,
        company_id: +event.target.value,
      },
    ]);
  };
  console.log(cahngeCompany);
  const defaultCompany = companies.filter((com, idx) => com.id === item.id);
  useEffect(() => {
    if (item) {
      setFormData({
        machine_id: item.machine_id,
        address: item.address,
        machine_phone: item.machine_phone,
        terminal_sim: item.terminal_sim,
        machine_pin: item.machine_pin,
        company_id: cahngeCompany[0]?.company_id,
      });
    }
  }, [cahngeCompany]);
  useEffect(() => {}, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.trim(),
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
      if (window.confirm("Видалити апарат?")) {
        const data = await axios.post("/machine/delete", {
          id: item.machine_id,
        });
        if (data.status === 200) {
          window.location.reload();
        }
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
      if (window.confirm(`Видати ${liters} літрів води?`) & (+liters <= 70)) {
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
      }
      if (+liters > 70) {
        window.alert("Завелика кількість літрів");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changePin = async (smsStatus, smsInfo, pin) => {
    try {
      if (window.confirm(`Змінити пін код на ${newPin}`) & (+liters <= 70)) {
        const result = await axios.post("/msg/change-pin", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            pin: pin,
            userData,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(
            `Змінено пін:${newPin}.${moment(new Date()).format("LLL")}`
          );
        }
      }
      if (newPin === null) {
        window.alert("Невірний пін");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeNumber = async (smsStatus, smsInfo, newNumber) => {
    try {
      if (window.confirm(`Змінити номер?`)) {
        const result = await axios.post("/msg/change-number", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            userData,
            newNumber: newNumber !== "" ? newNumber : smsInfo.machine_phone,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(`Номер телефону успішно змінено`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeToken = async (smsStatus, smsInfo, newToken) => {
    try {
      if (window.confirm(`Встановити токен?`)) {
        const result = await axios.post("/msg/change-token", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            userData,
            newToken: newToken !== "" ? newToken : smsInfo.machine_token,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(`Токен успішно змінено`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeAddress = async (smsStatus, smsInfo, newAnthillAddress) => {
    try {
      if (window.confirm(`Встановити токен?`)) {
        const result = await axios.post("/msg/change-address", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            userData,
            newAnthillAddress:
              newAnthillAddress !== ""
                ? newAnthillAddress
                : smsInfo.machine_address,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(`Номер телефону успішно змінено`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeServiceNumber = async (smsStatus, smsInfo, serviceNumber) => {
    try {
      if (window.confirm(`Встановити токен?`)) {
        const result = await axios.post("/msg/change-service-number", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            userData,
            serviceNumber:
              serviceNumber !== "" ? serviceNumber : smsInfo.terminal_sim,
          },
        });
        console.log(result.data[0]);
        if (result.data[0]) {
          setSmsStatusInfo(`Номер телефону успішно змінено`);
        }
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
          <Button
            onClick={() => {
              setCollapse((val) => !val);
            }}
          >
            {collapse ? "Приховати" : "Дивитись/Змінити"}
          </Button>
          <Button
            onClick={() => {
              setAdminFunctions((val) => !val);
            }}
          >
            {adminFunctions ? "Приховати" : "Сервісні функції"}
          </Button>
        </div>
      </div>
      {collapse ? (
        <div className="user__functions">
          <div className="form__control">
            <Input
              type="text"
              name="machine_id"
              placeholder="Код машини"
              value={formData.machine_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="address"
              placeholder="Адреса"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="machine_phone"
              placeholder="Моб тел. апарату"
              value={formData.machine_phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="machine_pin"
              placeholder="Пін код"
              value={formData.machine_pin}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="terminal_sim"
              placeholder="Сервісний номер"
              value={formData.terminal_sim}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <span style={{ backgroundColor: "green", padding: "0.4rem" }}>
              {cahngeCompany.length > 0
                ? cahngeCompany[0]?.company_name
                : companies?.map((val, idx) => {
                    if (val.id === item.id) {
                      return val.company_name;
                    }
                  })}
              {/* {companies?.map((val,idx)=>{
        if (val.id === item.id) {
          return val.company_name
        }
      })} */}
            </span>
            <select onChange={(event) => setNewCompany(event)}>
              {companies
                ?.sort((a, b) => b.company_name - a.company_name)
                .map((val, idx) => {
                  return (
                    <option key={idx} value={val.id}>
                      {val.company_name}
                    </option>
                  );
                })}
            </select>
          </div>

          <Button onClick={editMachine}>Редагувати</Button>
          <Button
            onClick={() => deleteMachine(item)}
            style={{ backgroundColor: "red" }}
          >
            Видалити
          </Button>
        </div>
      ) : null}
      {adminFunctions ? (
        <div className="admin__functions">
          <div className="form__control">
            <div></div>
            <Button onClick={() => restartModule(2, item)}>
              Перезавантажити GSM MODULE
            </Button>
          </div>
          <div className="form__control">
            <div></div>
            <Button onClick={() => collectCash(3, item)}>Collect Cash</Button>
          </div>
          <div className="form__control">
            <div></div>
            <Button onClick={() => getInfo(6, item)}>Get Info</Button>
          </div>
          <div className="form__control">
            <Input
              type="text"
              defaultValue={item.machine_pin}
              onChange={(e) => setNewPin(e.target.value)}
            />
            <Button onClick={() => changePin(5, item, newPin)}>
              Змінити пін
            </Button>
          </div>

          <div className="form__control">
            <Input
              type="text"
              placeholder="38098...."
              defaultValue={item.machine_phone}
              onChange={(e) => setNewNumber(e.target.value)}
            />
            <Button onClick={() => changeNumber(7, item, newNumber)}>
              Змінити номер модуля
            </Button>
          </div>
          <div className="form__control">
            <Input
              type="text"
              placeholder="ТОКЕН"
              defaultValue={item.machine_token}
              onChange={(e) => setNewToken(e.target.value)}
            />
            <Button onClick={() => changeToken(8, item, newToken)}>
              Змінити токен
            </Button>
          </div>
          <div className="form__control">
            <Input
              type="text"
              placeholder="ANTHILL ADDRES"
              defaultValue={item.machine_address}
              onChange={(e) => setNewAnthillAddress(+e.target.value)}
            />
            <Button onClick={() => changeAddress(9, item, newAnthillAddress)}>
              Змінити ADR
            </Button>
          </div>
          <div className="form__control">
            <Input
              type="text"
              placeholder="Service Number"
              defaultValue={item.terminal_sim}
              onChange={(e) => setServiceNumber(e.target.value)}
            />
            <Button
              onClick={() => changeServiceNumber(10, item, serviceNumber)}
            >
              Змінити сервісний номер
            </Button>
          </div>
          <div className="form__control">
            <Input
              type="number"
              placeholder="150"
              min={50}
              max={500}
              value={priceForLitter}
              onChange={(e) => setPriceForLitter(e.target.value)}
            />
            <Button onClick={(e) => priceForLiter(4, item, priceForLitter)}>
              Встановити ціну за літр
            </Button>
          </div>
          <div className="form__control">
            <Input
              type="number"
              min={1}
              max={70}
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
            />
            <Button onClick={() => addLiters(1, item, liters)}>
              Видати воду
            </Button>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default AdminMachineItem;
