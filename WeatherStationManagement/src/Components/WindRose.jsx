import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const WindRose = () => {
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

  return (
    <div className="col-md-6 offset-md-3 mb-3 text-center">
      <h5 className="card-subtitle mb-2">WindRose</h5>
    </div>
  );
};

export default WindRose;
