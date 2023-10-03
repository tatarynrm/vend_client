import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from '../../utils/axios'

const Home = () => {
  const [users, setUsers] = useState([]);
  const [allMachines, setAllMachines] = useState([]);
  const [companies,setCompanies] = useState([])
  const getAllUsers = async () => {
    try {
      const data = await axios("/user");
      console.log(data.data);
      if (data.status === 200) {
        setUsers(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const getAllCompanies = async () => {
    try {
      const data = await axios.get("/client");
      console.log(data);
      if (data.status === 200) {
          setCompanies(data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  
  useEffect(() => {
    getAllMachines();
  }, []);

  useEffect(() => {

    getAllCompanies();
  }, []);
console.log(allMachines);
  return (
    <div className="home page">
      <div className="home__inner container"></div>


<div className="cards">
  <div className="card__items">
    <div className="card__item">
      <span>Користувачів</span>
    <span>{users?.filter(item => item.id !== null).length}</span>
    </div>
    <div className="card__item">
    <span>Компаній</span>
    <span>{companies?.filter(item => item.id !== null).length}</span>
    </div>
    <div className="card__item">
    <span>Апаратів</span>
    <span>{allMachines?.filter(item => item.machine_id !== null).length}</span>
    </div>
  </div>
</div>

    </div>
  );
};

export default Home;
