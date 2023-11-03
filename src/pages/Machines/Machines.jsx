import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactDOMServer from "react-dom/server";
import "./Machine.scss";
import axios from "../../utils/axios";
import { Parser } from "html-to-react";

import MachineItem from "./MachineItem";
import {
  Box,
  Button,
  FormControl,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import LiqPayMainButton from "../../components/liqpay_button/LiqPayForm";
import PaymentForm from "../../components/liqpay_button/LiqPayForm";
import LiqPayForm from "../../components/liqpay_button/LiqPayForm";
import LiqPayCheckout from "../../components/liqpay_button/LiqPayCheckout";
const Machines = () => {
  const userData = useSelector((state) => state.auth.data);
  const [machine, setMachine] = useState([]);
  const [smsStatusInfo, setSmsStatusInfo] = useState(null);
  const [htmlButtonToPay, setHtmlButtonToPay] = useState("");
  const parse = (val) => val.replace(/^\$/, "");
  const [amount, setAmount] = useState(100);
  const fullHTML = ReactDOMServer.renderToString(htmlButtonToPay);



  const getMyMachines = async () => {
    try {
      const data = await axios.post("/machine", {
        company_id: +userData?.company_id,
      });

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

  const createPayment = async () => {
    try {
      const data = await axios.post("/liqpay/create-payment", {
        amount: amount,
        user_id:userData?.id
      });
     
      if (data.data) {
        setHtmlButtonToPay(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   const createPayment = async () => {
  //     try {
  //       const data = await axios.post("/liqpay/create-payment");
  //       console.log(data);
  //       if (data.data) {
  //         setHtmlButtonToPay(data.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   createPayment();
  // }, []);
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
                Внесіть абонплату.
              </Text>
              <Text color={"red.500"} fontWeight={"bold"} fontSize={40}>
                Або зверніться до адміністратора.
              </Text>
              <FormControl as={Stack} display={"flex"} width={"300px"}>
                <NumberInput
                  defaultValue={amount}
                  value={amount}
                  onChange={(e) => setAmount(parse(e))}
                  min={100}
                  max={1000}
                >
                  <NumberInputField placeholder="Сума до сплати ?" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button onClick={createPayment} variant={"outline"}>
                  Сформувати рахунок:
                </Button>
              </FormControl>
              {htmlButtonToPay && (
                <div  style={{ display: "block" }}>
                  <div
                   
                    dangerouslySetInnerHTML={{
                      __html: htmlButtonToPay,
                    }}
                  />
                </div>
              )}

              <Box width={"100%"} height={"400px"}></Box>
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
