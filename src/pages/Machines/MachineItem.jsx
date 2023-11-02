import React, { useEffect, useState } from "react";
import water_machine_photo from "../../assets/photo/water_machine.png";
import { FcCollapse } from "react-icons/fc";
import { smsStatusUser } from "../../services/smsServices";
import axios from "../../utils/axios";
import moment from "moment";
import "moment/locale/uk";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
const MachineItem = ({ item, setSmsStatusInfo }) => {
  const userData = useSelector((state) => state.auth.data);

  const [liters, setLiters] = useState(1);
  const [collapse, setCollapse] = useState(false);
  const [smsStatus, setSmsStatus] = useState(null);
  const [priceForLitter, setPriceForLitter] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [formData, setFormData] = useState({});
  const [smsTitle, setSmsTitle] = useState(null);

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
  const sendSms = async (smsStatus, smsInfo, liters) => {
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
  const changeNumber = async (smsStatus, smsInfo, newNumber) => {
    try {
      if (window.confirm(`Змінити номер?`)) {
        const result = await axios.post("/msg/change-number", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            userData,
            newNumber: formData.machine_phone,
          },
        });
        console.log(result.status);
        if (result.status === 200) {
          setSmsTitle(`Номер телефону успішно змінено`);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (event) => {
    // Ensure the input value is not negative
    const inputValue = event.target.value;
    if (inputValue === "" || parseFloat(inputValue) >= 0) {
      setPriceForLitter(inputValue);
    }
  };
  const changePhoneNumber = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.trim(),
    }));
  };
  useEffect(() => {
    if (item) {
      setFormData({
        machine_phone: item.machine_phone,
      });
    }
  }, [smsTitle]);
  return (
    <React.Fragment>
      <div className="water__machine">
        <FcCollapse
          onClick={() => setCollapse((val) => !val)}
          size={30}
          className="collapse__machine"
          style={{ transform: collapse ? "rotate(0deg)" : "rotate(180deg)" }}
        />
        <div className="water__machine-icon">
          <img src={water_machine_photo} alt="water_machine" />
        </div>
        <div className="water__machine-info">
          <p className="machine__address">{item.address}</p>

          <p className="machine__address">Код автомату: {item.machine_id}</p>

          <p className="machine__address">Пін: {item.machine_pin}</p>

          <p className="machine__address">
            Телефон апарату: {item.machine_phone}
          </p>
        </div>
        <div className="water__machine-functions">
          <div className="form__control">
            <input
              type="number"
              min={1}
              max={70}
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
            />
            <Button onClick={() => sendSms(1, item, liters)} className="normal">
              Видати воду
            </Button>
          </div>
        </div>
      </div>
      {collapse && (
        <div className="water__bottom-menu">
          <Button onClick={() => restartModule(2, item)} className="normal">
            Перезавантажити GSM MODULE
          </Button>
          <Button onClick={() => collectCash(3, item)} className="normal">
            Collect Cash
          </Button>
          <div className="water__bottom-menu-control">
            <input
              type="number"
              value={priceForLitter}
              onChange={(e) => setPriceForLitter(e.target.value)}
            />
            <span>Ціна : 150 = 1.5 грн</span>
            <Button
              onClick={(e) => priceForLiter(4, item, priceForLitter)}
              className="normal"
            >
              Встановити ціну за літр
            </Button>
          </div>
          <div
            className="water__bottom-menu-control"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              placeholder="Номер телефону апарату"
              name="machine_phone"
              value={formData?.machine_phone}
              onChange={changePhoneNumber}
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
            <Button
              onClick={(e) => changeNumber(7, item, formData.machine_phone)}
              className="normal"
            >
              Встановити новий номер телефону
            </Button>
            {smsTitle && smsTitle}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MachineItem;
