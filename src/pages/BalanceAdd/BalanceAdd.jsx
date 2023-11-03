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
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";

const BalanceAdd = () => {
  const userData = useSelector((state) => state.auth.data);
  const parse = (val) => val.replace(/^\$/, "");
  const [amount, setAmount] = useState(100);

  const [htmlButtonToPay, setHtmlButtonToPay] = useState("");

  const fullHTML = ReactDOMServer.renderToString(htmlButtonToPay);
  const createPayment = async () => {
    try {
      const data = await axios.post("/liqpay/create-payment", {
        amount: amount,
        company_id: userData?.company_id,
        name: userData?.name,
        surname: userData?.surname,
      });

      if (data.data) {
        setHtmlButtonToPay(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"70vh"}
    >
      <Text color={"green.500"} fontWeight={"bold"} fontSize={40}>
        Введіть суму поповнння
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
        <div style={{ display: "block" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: htmlButtonToPay,
            }}
          />
        </div>
      )}

      <Box width={"100%"} height={"400px"}></Box>
    </Stack>
  );
};

export default BalanceAdd;
