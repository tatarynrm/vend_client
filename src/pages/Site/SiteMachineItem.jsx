import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SiteMachineItem = ({ item }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.trim(),
    }));
  };

  const updateMachine = async () => {
    try {
      const data = await axios.post(
        "https://api.vendmarket.space/site/update-machine",
        formData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setFormData({
      id: item.id,
      title: item.machine_name,
      price: item.machine_price,
    });
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      border={"1px solid whitesmoke"}
      padding={2}
    >
      <Input
        width={"100%"}
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <Input
        width={"100%"}
        name="price"
        value={formData.price}
        onChange={handleInputChange}
      />
      <Button onClick={updateMachine} margin={"0 auto"} width={"40%"} padding={4} colorScheme="blue">
        Зберегти зміни
      </Button>
    </Box>
  );
};

export default SiteMachineItem;
