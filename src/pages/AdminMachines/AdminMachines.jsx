import React, { useEffect, useState } from "react";
import "./AdminMachines.scss";
import axios from "../../utils/axios.js";
import AdminMachineItem from "./AdminMachineItem";
import {GiVendingMachine} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import AddMachineForm from "../../components/forms/machine/AddMachineForm";
const AdminMachines = () => {
  const [allMachines, setAllMachines] = useState([]);
const [addNewMachine,setAddNewMachine] = useState(false)
  const getAllMachines = async () => {
    try {
      const data = await axios.get("/machine/all");
      console.log(data);
      if (data.status === 200) {
        setAllMachines(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allMachines);
  useEffect(() => {
    getAllMachines();
  }, []);
  return (
    <div className="admin-machines page">
      <div className="admin__machines__inner container">
      {addNewMachine ? (
          <AiFillCloseCircle
            onClick={() => setAddNewMachine((val) => !val)}
            size={40}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <GiVendingMachine
            onClick={() => setAddNewMachine((val) => !val)}
            size={40}
            style={{ cursor: "pointer" }}
          />
        )}
         {addNewMachine ? <AddMachineForm /> : null}
        {allMachines.length > 0
          ? allMachines
              ?.filter((val) => val.machine_id !== null)
              .map((item, idx) => {
                return <AdminMachineItem key={idx} idx={idx} item={item} />;
              })
          : null}
      </div>
    </div>
  );
};

export default AdminMachines;
