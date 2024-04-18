import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SiteMachineItem from "./SiteMachineItem";

const Site = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const getMachines = async () => {
      try {
        const { data } = await axios("https://api.vendmarket.space/site");
        console.log(data);
        setMachines(data);

      } catch (error) {
        console.log(error);
      }
    };
    getMachines();
  }, []);

  return (
    <div className="site page">
       <Box display={'flex'} justifyContent={'center'}>
       <Text fontWeight={'bold'}>Адміністрування сайтом vendwater.com.ua</Text>
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
