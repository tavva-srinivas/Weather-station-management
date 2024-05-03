import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [userTotal, setUserTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .all([
        axios.get("http://localhost:3000/auth/admin_records"),
        axios.get("http://localhost:3000/auth/admin_count"),
        axios.get("http://localhost:3000/auth/user_count"),
      ])
      .then(
        axios.spread((adminRecordsRes, adminCountRes, userCountRes) => {
          if (adminRecordsRes.data.Status) {
            setAdmins(adminRecordsRes.data.Result);
          } else {
            alert(adminRecordsRes.data.Error);
          }

          if (adminCountRes.data.Status) {
            setAdminTotal(adminCountRes.data.Result[0].admin);
          }

          if (userCountRes.data.Status) {
            setUserTotal(userCountRes.data.Result[0].user);
          }
        })
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Admin</h4>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <h5>Total:</h5>
                <h5>{adminTotal}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">User</h4>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <h5>Total:</h5>
                <h5>{userTotal}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="mb-3">List of Admins</h3>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.id}>
                        <td>{admin.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
