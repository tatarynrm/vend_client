import React from "react";
import "./Home.scss";
import axios from '../../utils/axios'
const Home = () => {
const sendMsg = async ()=>{
  try {
    const data = await axios.post('/msg')
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="home page">
      <div className="home__inner container"></div>


{/* <button onClick={sendMsg}>Провірити</button> */}

    </div>
  );
};

export default Home;
