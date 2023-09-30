import axios from "../utils/axios";
export const smsStatusUser = (status) => {
  switch (status) {
    case 1:
      return "Видача води";

    case 2:
      return "Перезавантаження модуля";

    case 3:
      return "Collect Cash";

    case 4:
      return "Встановити ціну";

    case 5:
      return "Змінити пін";
    case 6:
      return "Get Info";
    case 7:
      return "Заміна номера модуля";
    case 8:
      return "Встановити токен";
    case 9:
      return "Set anthillAdreess";
    default:
      break;
  }
};

export const sendSms = async (smsStatus, smsInfo, liters) => {
  try {
    const result = await axios.post("/msg", {
      data: {
        smsType: smsStatusUser(smsStatus),
        smsInfo,
        liters,
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
