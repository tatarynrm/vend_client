import React, { useEffect, useState } from "react";
import "./Clients.scss";
import axios from "../../utils/axios";
import ClientItem from "./ClientItem";
import { BsBuildingAdd } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import AddUser from "../Users/AddUser";
import AddClientForm from "../../components/forms/client/AddClientForm";
const Clients = () => {
  const [clients, setClients] = useState([]);
  const [addNewClient, setAddNewClient] = useState(false);
  const getAllClients = async () => {
    try {
      const data = await axios("/client");
      if (data.status === 200) {
        setClients(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);
  console.log(clients);
  return (
    <div className="clients page">
      <div className="clients__inner container">
        {addNewClient ? (
          <AiFillCloseCircle
            onClick={() => setAddNewClient((val) => !val)}
            size={40}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <BsBuildingAdd
            onClick={() => setAddNewClient((val) => !val)}
            size={40}
            style={{ cursor: "pointer" }}
          />
        )}
         {addNewClient ? <AddClientForm /> : null}
        {clients ? (
          clients.map((item, idx) => {
            return <ClientItem key={idx} item={item} />;
          })
        ) : (
          <span>Завантаження...</span>
        )}
      </div>
    </div>
  );
};

export default Clients;
