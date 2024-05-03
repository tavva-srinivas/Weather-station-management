import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/userdetail/${id}`)
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className='"container-fluid'>
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/user_dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 ,t-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                User Dashboard
              </span>
            </Link>

            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to={`/user_dashboard/userdetail`+id}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">User Details</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/user_dashboard/weatherData"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="bi-thermometer fs-4 ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Weather Data</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/user_dashboard/graphs"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Graphs</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Weather Station Management</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
