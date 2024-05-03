import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    stationName: "",
    latitude: "",
    longitude: "",
    date: "",
    time: "",
    battery: "",
    sensor_id: "",
  });

  const [sensor, setSensor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/sensor")
      .then((result) => {
        if (result.data.Status) {
          setSensor(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/user/" + id)
      .then((result) => {
        setUser({
          ...user,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          stationName: result.data.Result[0].stationName,
          latitude: result.data.Result[0].latitude,
          longitude: result.data.Result[0].longitude,
          date: result.data.Result[0].date,
          time: result.data.Result[0].time,
          battery: result.data.Result[0].battery,
          sensor_id: result.data.Result[0].sensor_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_user/" + id, user)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/user");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-75 border">
        <h3 className="text-center mb-4">Edit User</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="col-md-6">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              autoComplete="off"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          {/* Station Name */}
          <div className="col-md-6">
            <label htmlFor="inputStationName" className="form-label">
              Station Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputStationName"
              placeholder="Enter Station Name"
              value={user.stationName}
              onChange={(e) =>
                setUser({ ...user, stationName: e.target.value })
              }
            />
          </div>
          {/* Latitude */}
          <div className="col-md-6">
            <label htmlFor="inputLatitude" className="form-label">
              Latitude
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLatitude"
              placeholder="Enter Latitude"
              value={user.latitude}
              onChange={(e) => setUser({ ...user, latitude: e.target.value })}
            />
          </div>
          {/* Longitude */}
          <div className="col-md-6">
            <label htmlFor="inputLongitude" className="form-label">
              Longitude
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLongitude"
              placeholder="Enter Longitude"
              value={user.longitude}
              onChange={(e) => setUser({ ...user, longitude: e.target.value })}
            />
          </div>
          {/* Date */}
          <div className="col-md-6">
            <label htmlFor="inputDate" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDate"
              placeholder="Enter Date"
              value={user.date}
              onChange={(e) => setUser({ ...user, date: e.target.value })}
            />
          </div>
          {/* Time */}
          <div className="col-md-6">
            <label htmlFor="inputTime" className="form-label">
              Time
            </label>
            <input
              type="time"
              className="form-control rounded-0"
              id="inputTime"
              placeholder="Enter Time"
              value={user.time}
              onChange={(e) => setUser({ ...user, time: e.target.value })}
            />
          </div>
          {/* Battery */}
          <div className="col-md-6">
            <label htmlFor="inputBattery" className="form-label">
              Battery
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputBattery"
              placeholder="Enter Battery"
              value={user.battery}
              onChange={(e) => setUser({ ...user, battery: e.target.value })}
            />
          </div>
          {/* Sensor */}
          <div className="col-12 mb-3">
            <label htmlFor="sensor" className="form-label">
              Sensor
            </label>
            <select
              name="sensor"
              id="sensor"
              className="form-select"
              onChange={(e) => setUser({ ...user, sensor_id: e.target.value })}
              // Add disabled attribute to make it non-selectable
            >
              <option value="" selected>
                Select a Sensor
              </option>
              {sensor.map((c) => (
                <optgroup key={c.stationId}>
                  <option value={c.stationId}>Station ID: {c.stationId}</option>
                  <option disabled>Wind Speed: {c.windSpeed}</option>
                  <option disabled>Wind Direction: {c.windDirection}</option>
                  <option disabled>Temperature: {c.temperature}</option>
                  <option disabled>Humidity: {c.humidity}</option>
                  <option disabled>
                    Atmospheric Pressure: {c.atmosphericPressure}
                  </option>
                  <option disabled>Precipitation: {c.precipitation}</option>
                </optgroup>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <button className="btn btn-success w-100 rounded-0 mt-3">
              Edit User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
