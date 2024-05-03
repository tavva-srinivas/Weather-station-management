import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    stationName: "",
    latitude: "",
    longitude: "",
    date: "",
    time: "",
    battery: "",
    sensor_id: "",
  });

  const [sensor, setSensor] = useState([]);
  const navigate = useNavigate()

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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('image', user.image);
    formData.append('stationName', user.stationName);
    formData.append('latitude', user.latitude);
    formData.append('longitude', user.longitude);
    formData.append('date', user.date);
    formData.append('time', user.time);
    formData.append('battery', user.battery);
    formData.append('sensor_id', user.sensor_id);

    axios.post('http://localhost:3000/auth/add_user', formData)
  .then(result => {
    // Check if the response contains data
    if (result.data.Status) {
      navigate("/dashboard/user");
    } else {
      alert(result.data.Error);
    }
  })
  .catch(error => {
    // Check if the error is a network error or a server error
    if (error.response) {
      // The request was made and the server responded with a status code
      // Log the status code and any response data from the server
      console.error('Server Error:', error.response.status);
      console.error('Server Response Data:', error.response.data);
      // Show an error message or handle the error appropriately
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      // Show an error message or handle the error appropriately
    } else {
      // Something else happened while setting up the request
      console.error('Error:', error.message);
      // Show an error message or handle the error appropriately
    }
  });

  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-75 border">
        <h3 className="text-center mb-4">Add User</h3>
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
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          {/* Password */}
          <div className="col-md-6">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Enter Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          {/* Select Image */}
          <div className="col-md-6">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setUser({ ...user, image: e.target.files[0] })}
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
              onChange={(e) => setUser({...user, sensor_id: e.target.value})}
              // Add disabled attribute to make it non-selectable
            >
              <option value="" selected>
                Select a Sensor
              </option>
              {sensor.map((c) => (
                <optgroup
                  key={c.stationId}
                >
                  <option>Station ID: {c.stationId}</option>
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
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
