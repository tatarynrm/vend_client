import React, { useState } from "react";
import water_machine_photo from "../../assets/photo/water_machine.png";
import { FcCollapse } from "react-icons/fc";
const MachineItem = ({ item }) => {
  const [liters, setLiters] = useState(1);
  const [collapse, setCollapse] = useState(false);
  console.log(collapse);
  return (
    <React.Fragment>
      <div className="water__machine">
        <FcCollapse
          onClick={() => setCollapse((val) => !val)}
          size={30}
          className="collapse__machine"
          style={{ transform: collapse ? "rotate(0deg)" : "rotate(180deg)" }}
        />
        <div className="water__machine-icon">
          <img src={water_machine_photo} alt="water_machine" />
        </div>
        <div className="water__machine-info">
          <p className="machine__address">{item.address}</p>

          <p className="machine__address">Код автомату: {item.machine_id}</p>

          <p className="machine__address">Пін: {item.machine_pin}</p>

          <p className="machine__address">
            Телефон апарату: {item.machine_phone}
          </p>
        </div>
        <div className="water__machine-functions">
          <div className="form__control">
            <input
              type="number"
              min={1}
              max={30}
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
            />
            <button className="normal">Видати воду</button>
          </div>
        </div>
      </div>
      {collapse && <div className="water__bottom-menu">
        
        <button className="normal">Перезавантажити GSM MODULE</button>
        <button className="normal">Collect Cash</button>
        <div className="water__bottom-menu-control">
            <input type="number" />
            <button className="normal">Встановити ціну за літр</button>
        </div>
        </div>}
    </React.Fragment>
  );
};

export default MachineItem;
