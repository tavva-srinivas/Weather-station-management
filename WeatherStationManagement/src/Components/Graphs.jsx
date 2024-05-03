import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Chart from "chart.js/auto";

const Graphs = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [joinedData, setJoinedData] = useState({
    dates: [],
    times: [],
    windSpeeds: [],
    windDirections: [],
    temperatures: [],
    humidities: [],
    atmosphericPressures: [],
    precipitations: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/userdetail/${id}`)
      .then((result) => {
        const { User, JoinedData } = result.data;
        setUserData(User);

        const dates = JoinedData.map((data) => data.date);
        const times = JoinedData.map((data) =>
          formatDate(data.date, data.time)
        );
        const windSpeeds = JoinedData.map((data) => data.windSpeed);
        const windDirections = JoinedData.map((data) => data.windDirection);
        const temperatures = JoinedData.map((data) => data.temperature);
        const humidities = JoinedData.map((data) => data.humidity);
        const atmosphericPressures = JoinedData.map(
          (data) => data.atmosphericPressure
        );
        const precipitations = JoinedData.map((data) => data.precipitation);

        setJoinedData({
          dates,
          times,
          windSpeeds,
          windDirections,
          temperatures,
          humidities,
          atmosphericPressures,
          precipitations,
        });

        renderCharts(
          times,
          windSpeeds,
          windDirections,
          temperatures,
          humidities,
          atmosphericPressures,
          precipitations
        );
      })
      .catch((err) => console.log(err));
  }, [id]);

  const formatDate = (date, time) => {
    const formattedDate = new Date(date);
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    formattedDate.setHours(hours);
    formattedDate.setMinutes(minutes);
    return formattedDate.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderCharts = (
    times,
    windSpeeds,
    windDirections,
    temperatures,
    humidities,
    atmosphericPressures,
    precipitations
  ) => {
    const ctxWind = document.getElementById("chartWind").getContext("2d");
    const ctxTemp = document.getElementById("chartTemp").getContext("2d");
    const ctxHumidity = document
      .getElementById("chartHumidity")
      .getContext("2d");
    const ctxPressure = document
      .getElementById("chartPressure")
      .getContext("2d");
    const ctxPrecipitation = document
      .getElementById("chartPrecipitation")
      .getContext("2d");

    // Wind Speed Chart
    new Chart(ctxWind, {
      type: "line",
      data: {
        labels: times,
        datasets: [
          {
            label: "Wind Speed (km/h)",
            data: windSpeeds,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Date and Time",
              font: {
                size: 14,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Wind Speed (km/h)",
              font: {
                size: 14,
              },
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Temperature Chart
    new Chart(ctxTemp, {
      type: "line",
      data: {
        labels: times,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            fill: false,
            borderColor: "rgb(255, 99, 132)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Date and Time",
              font: {
                size: 14,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Temperature (°C)",
              font: {
                size: 14,
              },
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Humidity Chart
    new Chart(ctxHumidity, {
      type: "line",
      data: {
        labels: times,
        datasets: [
          {
            label: "Humidity ",
            data: humidities,
            fill: false,
            borderColor: "rgb(54, 162, 235)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Date and Time",
              font: {
                size: 14,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Humidity ",
              font: {
                size: 14,
              },
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Atmospheric Pressure Chart
    new Chart(ctxPressure, {
      type: "line",
      data: {
        labels: times,
        datasets: [
          {
            label: "Atmospheric Pressure (hPa)",
            data: atmosphericPressures,
            fill: false,
            borderColor: "rgb(255, 205, 86)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Date and Time",
              font: {
                size: 14,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Atmospheric Pressure (hPa)",
              font: {
                size: 14,
              },
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Precipitation Chart
    new Chart(ctxPrecipitation, {
      type: "line",
      data: {
        labels: times,
        datasets: [
          {
            label: "Precipitation (mm)",
            data: precipitations,
            fill: false,
            borderColor: "rgb(153, 102, 255)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Date and Time",
              font: {
                size: 14,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Precipitation (mm)",
              font: {
                size: 14,
              },
            },
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div>
      <div className="col-md-6 offset-md-3 mb-3 text-center">
        <h5 className="card-subtitle mb-2">Graphs</h5>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <canvas id="chartWind"></canvas>
        </div>
        <div className="col-md-6 mb-3">
          <canvas id="chartTemp"></canvas>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <canvas id="chartHumidity"></canvas>
        </div>
        <div className="col-md-6 mb-3">
          <canvas id="chartPressure"></canvas>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3 mb-3">
          <canvas id="chartPrecipitation"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
