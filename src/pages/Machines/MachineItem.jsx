import React, { useEffect, useState } from "react";
import water_machine_photo from "../../assets/photo/water_machine.png";
import { FcCollapse } from "react-icons/fc";
import { smsStatusUser } from "../../services/smsServices";
import axios from "../../utils/axios";
import moment from "moment";
import "moment/locale/uk";
import { useSelector } from "react-redux";
const MachineItem = ({ item, setSmsStatusInfo }) => {
  const userData = useSelector((state) => state.auth.data);
  console.log(userData);
  const [liters, setLiters] = useState(1);
  const [collapse, setCollapse] = useState(false);
  const [smsStatus, setSmsStatus] = useState(null);
  const [priceForLitter, setPriceForLitter] = useState("");
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
      if (window.confirm(`Видати ${liters} літрів води?`)) {
        const result = await axios.post("/msg", {
          data: {
            smsType: smsStatusUser(smsStatus),
            smsInfo,
            liters: liters  ? liters : 0,
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
  const handleInputChange = (event) => {
    // Ensure the input value is not negative
    const inputValue = event.target.value;
    if (inputValue === "" || parseFloat(inputValue) >= 0) {
      setPriceForLitter(inputValue);
    }
  };
  console.log(liters);

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
              max={100}
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
            />
            <button onClick={() => sendSms(1,item,liters)} className="normal">
              Видати воду
            </button>
          </div>
        </div>
      </div>
      {collapse && (
        <div className="water__bottom-menu">
          <button onClick={() => restartModule(2, item)} className="normal">
            Перезавантажити GSM MODULE
          </button>
          <button onClick={() => collectCash(3, item)} className="normal">
            Collect Cash
          </button>
          <div className="water__bottom-menu-control">
            <input
              type="number"
              value={priceForLitter}
              onChange={handleInputChange}
            />
            <span>Ціна : 150 = 1.5 грн</span>
            <button className="normal">Встановити ціну за літр</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MachineItem;
