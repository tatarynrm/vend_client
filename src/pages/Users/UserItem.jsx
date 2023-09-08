import React from "react";
import { FcHighPriority } from "react-icons/fc";
const UserItem = ({ item }) => {
  return (
    <React.Fragment>
      <div className={`user user-${item.id}`}>
        <div className="pip">
          {item.surname} {item.name} {item.last_surname}
        </div>
        <div>{item.email}</div>
        <div>{item.password}</div>
        <div>{item.tel}</div>
        <div>
          {item.company_id ? (
            <span style={{ cursor: "pointer" }}>{item.company_name}</span>
          ) : (
            <FcHighPriority title="Не підключено" />
          )}
        </div>
        <div>
          <button className="normal">Переглянути/Змінити</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserItem;
