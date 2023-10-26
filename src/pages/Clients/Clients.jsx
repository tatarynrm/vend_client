import React, { useEffect, useState } from "react";
import "./Clients.scss";
import axios from "../../utils/axios";
import ClientItem from "./ClientItem";
import { BsBuildingAdd } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import AddUser from "../Users/AddUser";
import AddClientForm from "../../components/forms/client/AddClientForm";
import { Input } from "@chakra-ui/react";
const Clients = () => {
  const [clients, setClients] = useState([]);
  const [addNewClient, setAddNewClient] = useState(false);
  const [search, setSearch] = useState("");
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
        <div className="search">
          <Input
            type="text"
            placeholder="Пошук"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {clients ? (
          clients
            .filter((item) =>
              search.toLocaleLowerCase() === "" ||
              search.toUpperCase() === "" ||
              search.charAt(0).toUpperCase() === "" ||
              search.charAt(0).toLowerCase() === ""
                ? item
                : item.company_code.toLowerCase().includes(search) ||
                  item.company_code.toUpperCase().includes(search) ||
                  item.company_name.toLowerCase().includes(search) ||
                  item.company_name.toUpperCase().includes(search) ||
                  item.director_surname.toLowerCase().includes(search) ||
                  item.director_surname.toUpperCase().includes(search) ||
                  item.legal_address.toLowerCase().includes(search) ||
                  item.legal_address.toUpperCase().includes(search) ||
                  (item.phone_number !== null &&
                    item.phone_number.toLowerCase().includes(search)) ||
                  (item.phone_number !== null &&
                    item.phone_number.toUpperCase().includes(search))
            )
            .map((item, idx) => {
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
