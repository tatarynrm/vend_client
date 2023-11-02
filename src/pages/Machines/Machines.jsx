import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Machine.scss";
import axios from "../../utils/axios";

import MachineItem from "./MachineItem";
import { Stack, Text } from "@chakra-ui/react";
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
  console.log("2313321", userData);
  return (
    <div className="machine page">
      <div className="machine__inner container">
        <div className="machines__block">
          {smsStatusInfo && (
            <span style={{ color: "green", fontSize: "30px" }}>
              {smsStatusInfo}
            </span>
          )}

          {userData?.active === 0 ? (
            <Stack
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"70vh"}
            >
              <Text color={"red.500"} fontWeight={"bold"} fontSize={40}>
                Обмеження аккаунту через неоплату (SMS)
              </Text>
              <Text color={"red.500"} fontWeight={"bold"} fontSize={40}>
                Зверніться до адміністратора
              </Text>
            </Stack>
          ) : (
            <Stack>
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
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

export default Machines;
