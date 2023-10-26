import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "../../utils/axios";
import { Card, CardBody, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Home = () => {
  const userData = useSelector((state) => state.auth.data);
  console.log(userData);
  const [users, setUsers] = useState([]);
  const [allMachines, setAllMachines] = useState([]);
  const [companies, setCompanies] = useState([]);
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
        setCompanies(data.data);
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

{userData?.role === 1 &&       <div className="cards">
        <div className="card__items">
          <Card>
            <CardBody
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Text> Користувачів </Text>
              <Text>{users?.filter((item) => item.id !== null).length}</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Text>Компаній</Text>
              <Text>
                {companies?.filter((item) => item.id !== null).length}
              </Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Text>Апаратів</Text>
              <Text>
                {allMachines?.filter((item) => item.machine_id !== null).length}
              </Text>
            </CardBody>
          </Card>
        </div>
      </div>}
    </div>
  );
};

export default Home;
