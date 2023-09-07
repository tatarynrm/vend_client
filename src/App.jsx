import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Users/Users";
import Clients from "./pages/Clients/Clients";
import SideBar from "./components/sidebar/SideBar";
import SmsPage from "./pages/SmsPage/SmsPage";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  useEffect(() => {}, [userData]);
  return (
    <div className="vendmarket">
      {userData ? <Header /> : null}

      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />

          {userData?.role === 1 ? (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/users" element={<Users />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/sms" element={<SmsPage />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
