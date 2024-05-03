import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import User from "./Components/User";
import AddUser from "./Components/AddUser";
import Sensor from "./Components/Sensor";
import AddSensor from "./Components/AddSensor";
import EditUser from "./Components/EditUser";
import Start from "./Components/Start";
import UserLogin from "./Components/UserLogin";
import UserDetail from "./Components/UserDetail";
import PrivateRoute from "./Components/PrivateRoute";
import UserEdit from "./Components/UserEdit";
import Graphs from "./Components/Graphs"
import WindRose from "./Components/WindRose";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/userlogin" element={<UserLogin />}></Route>
        <Route path="/user_edit/:id" element={<UserEdit />}></Route>
        <Route path="/graphs/:id" element={<Graphs />}></Route>
        <Route path="/windrose/:id" element={<WindRose />}></Route>
        <Route
          path="/userdetail/:id"
          element={
            <PrivateRoute>
              <UserDetail />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/user" element={<User />}></Route>
          <Route path="/dashboard/sensor" element={<Sensor />}></Route>
          <Route path="/dashboard/add_user" element={<AddUser />}></Route>
          <Route path="/dashboard/add_sensor" element={<AddSensor />}></Route>
          <Route path="/dashboard/edit_user/:id" element={<EditUser />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
