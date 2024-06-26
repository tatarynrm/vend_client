import React, { useEffect, useState } from "react";
import "./AdminMachines.scss";
import axios from "../../utils/axios.js";
import AdminMachineItem from "./AdminMachineItem";
import { GiVendingMachine } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import AddMachineForm from "../../components/forms/machine/AddMachineForm";
import { Input } from "@chakra-ui/react";
const AdminMachines = () => {
  const [allMachines, setAllMachines] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [addNewMachine, setAddNewMachine] = useState(false);
  const [search, setSearch] = useState("");
  const [smsStatusInfo, setSmsStatusInfo] = useState(null);
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
  const getOneMachine = async (id) => {
    try {
      const data = await axios.get(`/machine/${id}`);
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
        setCompanies(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMachines();
  }, [search]);

  useEffect(() => {
    getAllCompanies();
  }, [search]);

  let myArr = [...allMachines];
  console.log(myArr);

  const xxx = myArr
  ?.filter((val) => val.machine_id !== null)
  ?.filter((item) =>
    search.toLowerCase() === "" ||
    item?.machine_id
      ?.toString()
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    item?.company_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    item?.machine_phone?.toString().includes(search) ||
    item?.address?.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => a.id - b.id)
  .map((item, idx) => (
    <AdminMachineItem
      companies={companies}
      setSmsStatusInfo={setSmsStatusInfo}
      key={idx}
      idx={idx}
      item={item}
    />
  ))
  console.log('XXXXXXXXXX',xxx);
  return (
    <div className="admin-machines page">
      <div className="admin__machines__inner container">
        {smsStatusInfo && (
          <span style={{ color: "green", fontSize: "30px" }}>
            {smsStatusInfo}
          </span>
        )}
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
        {addNewMachine ? <AddMachineForm companies={companies} /> : null}
        <div className="search">
          <Input
            type="text"
            placeholder="Пошук"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {allMachines.length > 0 ? (
          <div className="machine__header-menu">
            <div className="machine__id">#</div>
            <div>№ Апарату</div>
            <div>Адреса</div>
            <div>Моб.тел апарату</div>
            <div>Пін код</div>
            <div>Компанія</div>
            <div>Сервісний номер</div>
            <div></div>
          </div>
        ) : null}
        {/* {allMachines.length > 0
          ? allMachines

              ?.filter((item) =>
                search.toLocaleLowerCase() == ""
                  ? item
                  : item?.machine_id
                      ?.toString()
                      .toLowerCase()
                      .includes(search) ||
                    item?.machine_id
                      ?.toString()
                      .toUpperCase()
                      .includes(search) ||
                    item?.company_name?.toLowerCase().includes(search) ||
                    item?.company_name?.toUpperCase().includes(search) ||
                    item?.machine_phone?.toString().includes(search) ||
                    item?.machine_phone?.toString().includes(search) ||
                    item?.address?.toLowerCase().includes(search) ||
                    item?.address?.toUpperCase().includes(search)
              )
              .map((item, idx) => {
                return (
                  <AdminMachineItem
                    companies={companies}
                    setSmsStatusInfo={setSmsStatusInfo}
                    key={idx}
                    idx={idx}
                    item={item}
                  />
                );
              })
          : null} */}
{myArr.length > 0
  ? xxx
  : null}
      </div>
    </div>
  );
};

export default AdminMachines;
