import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data)
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch,token]);
  useEffect(()=>{},[userData])
  return (
    <div className="vendmarket">
      {userData ? <Header /> : null}

      <div className="main__content">
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
