import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sensor = () => {
  const [sensor, setSensor] = useState([]);
  
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

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col">
          <h3 className="text-center">Sensors List</h3>
        </div>
        <div className="col-auto">
          <Link to="/dashboard/add_sensor" className="btn btn-success">
            Add Sensor
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Wind Speed</th>
              <th>Wind Direction</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Atmospheric Pressure</th>
              <th>Precipitation</th>
            </tr>
          </thead>
          <tbody>
            {sensor.map((c, index) => (
              <tr key={index}>
                <td>{c.windSpeed}</td>
                <td>{c.windDirection}</td>
                <td>{c.temperature}</td>
                <td>{c.humidity}</td>
                <td>{c.atmosphericPressure}</td>
                <td>{c.precipitation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sensor;
