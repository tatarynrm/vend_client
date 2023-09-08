import React, { useState } from "react";
import { BiSolidPhoneCall, BiSolidPhoneOff } from "react-icons/bi";
const ClientItem = ({ item }) => {
  const [collapse, setCollapse] = useState(false);
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
        <button onClick={() => setCollapse((val) => !val)} className="normal">
          {collapse ? "Приховати" : "Переглянути/Змінити"}
        </button>
      </div>
      {collapse ? <div className="client__functions">
        ..............
      </div> : null}
    </React.Fragment>
  );
};

export default ClientItem;
