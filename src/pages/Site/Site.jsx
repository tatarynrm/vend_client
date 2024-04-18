import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SiteMachineItem from "./SiteMachineItem";
import './Site.scss'

const Site = () => {
  const [machines, setMachines] = useState([]);
  const [contactBtn,setContactBtn] = useState({})
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContactBtn((prevFormData) => ({
      ...prevFormData,
      [name]: value.trim(),
    }));
  };
  const getMachines = async () => {
    try {
      const { data } = await axios("https://api.vendmarket.space/site");
      setMachines(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getComntacts = async () => {
    try {
      const { data } = await axios("https://api.vendmarket.space/site/contacts");
      console.log(data);
      setContactBtn(data);
    } catch (error) {
      console.log(error);
    }
  };
  const updatePhone = async () => {
    try {
      const data = await axios.post(
        "https://api.vendmarket.space/site/update-number",
        contactBtn
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    getMachines();
    getComntacts()
  }, []);

  return (
    <div className="site page">
      <Box display={"flex"} justifyContent={"center"}>
        <Text fontWeight={"bold"}>Адміністрування сайтом vendwater.com.ua</Text>
      </Box>
      <Box flexDirection={['column','row']} className="container phone_change" display={'flex'} gap={10}>
        <Input name="phone_number" placeholder="Вкажіть актуальний номер телефону"  value={contactBtn.phone_number} onChange={handleInputChange} />
        <Button colorScheme="blue" onClick={updatePhone}>Змінити номер</Button>
      </Box>
      <Flex
        flexDirection={"column"}
        gap={10}
        marginTop={20}
        className="container"
      >
        {machines &&
          machines.map((item, idx) => {
            return <SiteMachineItem key={idx} item={item} />;
          })}
      </Flex>
    </div>
  );
};

export default Site;
