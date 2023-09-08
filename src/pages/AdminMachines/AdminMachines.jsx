import React, { useEffect, useState } from "react";
import "./AdminMachines.scss";
import axios from "../../utils/axios.js";
const AdminMachines = () => {
  const [allMachines, setAllMachines] = useState([]);

  const getAllMachines = async () => {
    try {

        const data = await axios.get('/machine/all')
        console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllMachines()
  },[])
  return (
    <div className="admin-machines page">
      <div className="machines__inner container"></div>
    </div>
  );
};

export default AdminMachines;
