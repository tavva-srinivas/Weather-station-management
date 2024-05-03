import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const UserDetail = () => {
  const [userData, setUserData] = useState({});
  const [joinedData, setJoinedData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/userdetail/${id}`)
      .then((result) => {
        setUserData(result.data.User);
        setJoinedData(result.data.JoinedData);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/user/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDownload = () => {
    const csvData = convertToCSV(joinedData);

    const stationName = userData?.stationName || "UnknownStation";
    const fileName = `user_weather_data_${stationName}.csv`;

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const convertToCSV = (data) => {
    const header = [
      "Date",
      "Time",
      "Wind Speed (km/h)",
      "Wind Direction",
      "Temperature (°C)",
      "Humidity ",
      "Atmospheric Pressure (hPa)",
      "Precipitation (mm)",
    ];

    let csv;

    if (data.length === 0) {
      csv = ["No data available"];
    } else {
      csv = [
        header.join(","),
        ...data.map((item) =>
          [
            new Date(item.date).toLocaleDateString(),
            item.time.slice(0, 5), // Extract only the time part (hh:mm)
            item.windSpeed || "",
            item.windDirection || "",
            item.temperature || "",
            item.humidity || "",
            item.atmosphericPressure || "",
            item.precipitation !== undefined ? item.precipitation : "",
          ].join(",")
        ),
      ];
    }

    return csv.join("\n");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center mb-4">
          <h1 className="display-4">Weather Station Management</h1>
        </div>
        <div className="justify-content-center">
          <div className="col-md-6 offset-md-3 mb-3 text-center">
            <h5 className="card-subtitle mb-2 text-muted">Name:</h5>
            <p className="card-text text-center">{userData?.name}</p>
          </div>
          <div className="col-md-6 offset-md-3 mb-3 text-center">
            <h5 className="card-subtitle mb-2 text-muted">Email:</h5>
            <p className="card-text text-center">{userData?.email}</p>
          </div>
          <div className="col-md-6 offset-md-3 mb-3 text-center">
            <h5 className="card-subtitle mb-2 text-muted">Station Name:</h5>
            <p className="card-text text-center">{userData?.stationName}</p>
          </div>

          <div className="col-md-6 offset-md-3 mb-3 text-center">
            <button className="btn btn-success me-2" onClick={handleDownload}>
              Download Table Data
            </button>
          </div>

          <div className="col-md-6 offset-md-3 mb-3 text-center">
            <h5 className="card-subtitle mb-2">Weather Data:</h5>
          </div>

          <div className="col-md-10 offset-md-1">
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Wind Speed (km/h)</th>
                    <th>Wind Direction</th>
                    <th>Temperature (°C)</th>
                    <th>Humidity</th>
                    <th>Atmospheric Pressure (hPa)</th>
                    <th>Precipitation (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {joinedData.map((data, index) => (
                    <tr key={index}>
                      <td>{new Date(data.date).toLocaleDateString("en-GB")}</td>
                      <td>{data.time.slice(0, 5)}</td>
                      <td>{data.windSpeed}</td>
                      <td>{data.windDirection}</td>
                      <td>{data.temperature}</td>
                      <td>{data.humidity}</td>
                      <td>{data.atmosphericPressure}</td>
                      <td>{data.precipitation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-6 offset-md-3 mb-3 text-center">
              <Link
                to={`/graphs/` + userData?.id}
                className="btn btn-primary me-2"
              >
                Graphs
              </Link>
              <Link
                to={`/windrose/` + userData?.id}
                className="btn btn-primary me-2"
              >
                WindRose
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link
              to={`/user_edit/` + userData?.id}
              className="btn btn-primary me-2"
            >
              Edit
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
