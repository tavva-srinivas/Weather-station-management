import React, { useState } from "react";
import axios from "axios";

const AddSensor = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/add_sensor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);
      // Handle success response
    } catch (error) {
      console.error("Error uploading CSV file:", error);
      // Handle error response
    }
  };

  return (
    <div className="container">
      <h3 className="my-4">Add Sensor from CSV</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="csvFile" className="form-label">
            Select CSV File:
          </label>
          <input
            type="file"
            className="form-control"
            id="csvFile"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload CSV
        </button>
      </form>
    </div>
  );
};

export default AddSensor;
