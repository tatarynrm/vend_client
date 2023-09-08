import React from "react";

const AdminMachineItem = ({ item ,idx}) => {
  return (
    <React.Fragment>
      <div className="admin__machine-item">
        <div className="machine__number">{idx + 1}</div>
        <div className="machine__id">{item.machine_id}</div>
        <div className="machine__id">{item.legal_address}</div>
        <div className="machine__id">{item.machine_phone}</div>
        <div className="machine__id">{item.machine_pin}</div>
        <div className="machine__id">{item.company_name}</div>
      </div>
    </React.Fragment>
  );
};

export default AdminMachineItem;
