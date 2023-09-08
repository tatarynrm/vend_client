import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Machine.scss";
import axios from "../../utils/axios";

import MachineItem from "./MachineItem";
const Machine = () => {
  const userData = useSelector((state) => state.auth.data);
  const [machine, setMachine] = useState([]);

  const getMyMachines = async () => {
    try {
      const data = await axios.post("/machine", {
        company_id: +userData?.company_id,
      });
      console.log(data);
      if (data.status === 200) {
      }
      setMachine(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userData?.company_id) {
      getMyMachines();
    }
  }, [userData]);
  return (
    <div className="machine page">
      <div className="machine__inner container">
        <div className="machines__block">
          {machine ? (
            machine.map((item, idx) => {
              return <MachineItem key={idx} item={item} />;
            })
          ) : (
            <div>Немає апаратів до відображення</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Machine;
