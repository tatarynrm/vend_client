import React, { useEffect, useState } from 'react'
import './Clients.scss'
import axios from "../../utils/axios";
const Clients = () => {
    const [clients, setClients] = useState([]);

    const getAllClients = async () => {
      try {
        const data = await axios("/client");
        if (data.status === 200) {
            setClients(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
        getAllClients();
    }, []);
    console.log(clients);
  return (
    <div className='clients page'>
        <div className="clients__inner container">
            clients
        </div>
    </div>
  )
}

export default Clients