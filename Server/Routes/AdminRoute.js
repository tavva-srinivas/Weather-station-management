import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";
import csv from "csv-parser";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err)
      return res.json({ loginStatus: false, Error: "Query error" + err });
    if (result.length > 0) {
      const { email } = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.get("/sensor", (req, res) => {
  const sql = "SELECT * FROM sensor";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      // If it's an image file, store it in "Public/Images" folder
      cb(null, "Public/Images");
    } else if (file.mimetype === "text/csv") {
      // If it's a CSV file, store it in "uploads" folder
      cb(null, "Public/Uploads");
    } else {
      // Invalid file type, reject the upload
      cb(new Error("Invalid file type."));
    }
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on the current timestamp
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});



router.post("/add_sensor", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const csvFilePath = req.file.path;
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => {
      // Extract data from the CSV file
      const {
        current__wind_kph,
        current__wind_dir,
        current__temp_c,
        current__humidity,
        current__pressure_mb,
        current__precip_mm,
      } = data;

      // Construct the SQL query to insert data into the 'sensor' table
      const sql =
        "INSERT INTO sensor (windSpeed, windDirection, temperature, humidity, atmosphericPressure, precipitation) VALUES (?, ?, ?, ?, ?, ?)";

      const values = [
        current__wind_kph,
        current__wind_dir,
        current__temp_c,
        current__humidity,
        current__pressure_mb,
        current__precip_mm,
      ];

      // Execute the SQL query to insert data into the 'sensor' table
      con.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ error: "Database error." });
        }
        console.log("Data inserted into 'sensor' table.");
      });
    })
    .on("end", () => {
      // Remove the uploaded CSV file after processing
      fs.unlinkSync(csvFilePath);
      return res.status(200).json({ message: "Data inserted successfully into 'sensor' table." });
    });
});





router.post("/add_user", upload.single("image"), (req, res) => {
  console.log("Received User Data:", req.body);
  const sql = `INSERT INTO user (name, email, password, image, stationName, latitude, longitude, date, time, battery, sensor_id) VALUES (?)`;
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) {
      console.error("Bcrypt Error:", err); // Log bcrypt hashing error for debugging
      return res.status(500).json({ Status: false, Error: "Bcrypt Error" });
    }

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.file.filename,
      req.body.stationName,
      req.body.latitude,
      req.body.longitude,
      req.body.date,
      req.body.time,
      req.body.battery,
      req.body.sensor_id,
    ];

    con.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Database Error:", err); // Log database query error for debugging
        return res.status(500).json({ Status: false, Error: "Database Error" });
      }

      console.log("Database Insert Result:", result); // Log the database insert result for debugging
      return res.json({ Status: true });
    });
  });
});

router.get("/user", (req, res) => {
  const sql = "SELECT * FROM user";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM user WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE user set name = ?, email = ?, stationName = ?, latitude = ?, 
  longitude = ?, date = ?, time = ?, battery = ?, sensor_id = ? 
  WHERE id = ? `;
  const values = [
    req.body.name,
    req.body.email,
    req.body.stationName,
    req.body.latitude,
    req.body.longitude,
    req.body.date,
    req.body.time,
    req.body.battery,
    req.body.sensor_id,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_user/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM user WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "SELECT count(id) AS admin FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/user_count", (req, res) => {
  const sql = "SELECT count(id) AS user FROM user";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_records", (req, res) => {
  const sql = "SELECT  * FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
