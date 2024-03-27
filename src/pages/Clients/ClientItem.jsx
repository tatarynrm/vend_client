import React, { useEffect, useState } from "react";
import { BiSolidPhoneCall, BiSolidPhoneOff } from "react-icons/bi";
import axios from '../../utils/axios'
import { Button, Input } from "@chakra-ui/react";
const ClientItem = ({ item }) => {
  const [collapse, setCollapse] = useState(false);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (item) {
      setFormData({
        company_name: item.company_name,
        director_name: item.director_name,
        director_surname: item.director_surname,
        director_last_surname: item.director_last_surname,
        company_code: item.company_code,
        legal_address: item.legal_address,
        phone_number: item.phone_number || 0,
        id:item.id
      });
    }
  }, [collapse]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
console.log(+formData.company_code);
  const editClient = async ()=>{
    try {
      const data = await axios.post('/client/edit',formData)
      if (data.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteClient = async (item)=>{
    try {
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <React.Fragment>
      <div className={`client client-${item.id}`}>
        <div className="client__name">{item.company_name}</div>
        <div className="client__director">
          {item.director_surname} {item.director_name}{" "}
          {item.director_last_surname}
        </div>
        <div className="client__address">{item.legal_address}</div>
        <div className="client__address">
          {item.phone_number ? (
            <span>
              <BiSolidPhoneCall /> {item.phone_number}
            </span>
          ) : (
            <span>
              <BiSolidPhoneOff />
            </span>
          )}
        </div>
        <Button onClick={() => setCollapse((val) => !val)} >
          {collapse ? "Приховати" : "Переглянути/Змінити"}
        </Button>
      </div>
      {collapse ? (
        <div className="user__functions">
          <div className="form__control">
            <Input
              type="text"
              name="company_name"
              placeholder="Назва компанії"
              value={formData.company_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="director_surname"
              placeholder="Прізвище директора"
              value={formData.director_surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="director_name"
              placeholder="Ім'я директора"
              value={formData.director_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="director_last_surname"
              placeholder="По-батькові"
              value={formData.director_last_surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="company_code"
              placeholder="Код ЄРДПОУ / ІПН"
              value={formData.company_code}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="legal_address"
              placeholder="Адреса"
              value={formData.legal_address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <Input
              type="text"
              name="phone_number"
              placeholder="Номер телефону"
              value={formData.phone_number }
              onChange={handleInputChange}
            />
          </div>

          <Button  onClick={editClient} >Редагувати</Button>
          <Button onClick={()=> deleteClient(item) }colorScheme='red' >Видалити</Button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ClientItem;
