import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/user")
      .then((result) => {
        if (result.data.Status) {
          setUser(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_user/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>User List</h3>
        <Link to="/dashboard/add_user" className="btn btn-success">
          Add User
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Image</th>
              <th>Station Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Date</th>
              <th>Time</th>
              <th>Battery</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((c, index) => (
              <tr key={index}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + c.image}
                    className="user_image"
                    alt=""
                  />
                </td>
                <td>{c.stationName}</td>
                <td>{c.latitude}</td>
                <td>{c.longitude}</td>
                <td>{c.date}</td>
                <td>{c.time}</td>
                <td>{c.battery}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_user/` + c.id}
                    className="btn btn-primary user-action-btn"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger user-action-btn"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
