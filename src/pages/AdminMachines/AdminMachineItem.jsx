import React, { useState } from "react";

const AdminMachineItem = ({ item, idx }) => {
  const [collapse,setCollapse] = useState(false)
  return (
    <React.Fragment>
      <div className="admin__machine-item">
        <div className="machine__id">{idx + 1}</div>
        <div className="machine__number">{item.machine_id}</div>
        <div>
          {item.address ? item.address : "Адресу не встановлено"}
        </div>
        <div>
          {item.machine_phone ? item.machine_phone : "Номер не встановлено"}
        </div>
        <div>{item.machine_pin ? item.machine_pin : "ПІН не налаштовано"}</div>
        <div>{item.company_name ? item.company_name : "Не підключено"}</div>
        <div>
          {item.terminal_sim ? item.terminal_sim : "Серв.номер не встановлено"}
        </div>
        <div>
          <button onClick={()=>{setCollapse(val=>!val)}} className="normal">{collapse ? "Приховати" : "Дивитись/Змінити"}</button>
        </div>
      </div>
      {collapse ? 
      <div>........</div>
      : null}
    </React.Fragment>
  );
};

export default AdminMachineItem;
