import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Machine.scss";
import axios from "../../utils/axios";

import MachineItem from "./MachineItem";
const Machines = () => {
  const userData = useSelector((state) => state.auth.data);
  const [machine, setMachine] = useState([]);
  const [smsStatusInfo, setSmsStatusInfo] = useState(null);

  const getMyMachines = async () => {
    try {
      const data = await axios.post("/machine", {
        company_id: +userData?.company_id,
      });
      console.log(data);
      if (data.status === 200) {
        setMachine(data.data);
      }
    
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userData?.company_id) {
      getMyMachines();
    }
  }, [userData]);
  useEffect(() => {}, [smsStatusInfo]);

  return (
    <div className="machine page">
      <div className="machine__inner container">
        <div className="machines__block">
          {smsStatusInfo && (
            <span style={{ color: "green", fontSize: "30px" }}>
              {smsStatusInfo}
            </span>
          )}
          
          {machine ? (
            machine.map((item, idx) => {
              return (
                <MachineItem
                  setSmsStatusInfo={setSmsStatusInfo}
                  key={idx}
                  item={item}
                />
              );
            })
          ) : (
            <div>Немає апаратів до відображення</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Machines;
