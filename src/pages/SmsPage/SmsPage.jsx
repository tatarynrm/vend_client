import React, { useEffect, useState } from "react";
import "./SmsPage.scss";
import axios from "../../utils/axios";
import moment from "moment";
import "moment/locale/uk";
const SmsPage = () => {
  const [search, setSearch] = useState("");
  const [sms, setSms] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);
  const [searchCompany, setSearchCompany] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  console.log(companyId);
  const getPrice = () => {
    const totalPrice1 = sms.filter((item) => item.company_id !== null);

    const totalPrice = totalPrice1.reduce((accumulator, currentProduct) => {
      return accumulator + +currentProduct.price;
    }, 0);
    setTotalPrice(totalPrice.toFixed(2));
  };
  useEffect(() => {
    if (sms.length > 0) {
      getPrice();
    }
  }, [sms]);
  useEffect(() => {
    const getAllSms = async () => {
      try {
        const data = await axios.get("/sms");
        console.log(data);
        if (data.status === 200) {
          setSms(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllSms();
  }, []);

  const selectSmsByDate = async () => {
    try {
      const data = await axios.post("/sms/by-date", {
        dateFrom,
        dateTo,
      });
      if (data.status === 200) {
        setSms(data.data);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const selectSmsByDateAndCompany = async () => {
    try {
      const data = await axios.post("/sms/by-date-company", {
        dateFrom,
        dateTo,
        company_id:companyId,
      });
      if (data.status === 200) {
        setSms(data.data);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [sms, search]);
  useEffect(() => {
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
    getAllCompanies();
  }, []);

  return (
    <div className="sms page">
      <div className="sms__inner container">
        <div className="form__control">
          <input
            type="date"
            name="from"
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <input
            type="date"
            name="to"
            onChange={(e) => setDateTo(e.target.value)}
          />
          <select
            onChange={(e) => setCompanyId(e.target.value)}
            name="company_id"
            value={companyId}
          >
            <option value="0">Оберіть компанію</option>
            {companies.length > 1
              ? companies.map((item, idx) => {
                  return (
                    <option key={idx} value={item.id}>
                      {item.company_name}
                    </option>
                  );
                })
              : null}
          </select>
          <button
            onClick={
              companyId !== null ? selectSmsByDateAndCompany : selectSmsByDate
            }
            className="normal"
          >
            Дивитись період
          </button>
        </div>
        <div className="sms__items">
          <span className="total__price-sms">
            Загальна вартість смс становить : {totalPrice} грн
          </span>
          <input
            type="text"
            placeholder="Пошук"
            onChange={(e) => setSearch(e.target.value)}
          />
          {sms.length > 0
            ? sms
                .filter((item) => item.company_id !== null)
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.company_name.toLowerCase().includes(search);
                })
                .map((item, idx) => {
                  return (
                    <div className="sms__item" key={idx}>
                      <div className="id">{idx + 1}</div>
                      <div>{item.company_name}</div>
                      <div>{item.status_name}</div>
                      <div>{moment(item.created_at).format("LLLL")}</div>
                      <div>{+item.price} грн</div>
                    </div>
                  );
                })
            : null}
        </div>
      </div>
    </div>
  );
};

export default SmsPage;
