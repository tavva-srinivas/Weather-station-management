import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/userlogin", (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err)
      return res.json({ loginStatus: false, Error: "Query error" + err });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err)
          return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const { email } = result[0].email;
          const token = jwt.sign(
            { role: "user", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true, id: result[0].id });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.get("/userdetail/:id", (req, res) => {
  const id = req.params.id;

  // First query to fetch stationName based on user id
  const sql = "SELECT * FROM user WHERE id = ?";
  con.query(sql, [id], (err, userResult) => {
    if (err) {
      return res.json({ Status: false });
    }
    
    const stationName = userResult[0]?.stationName; // Extract stationName from the result

    // Second query to join user and sensor tables based on stationName
    const sql1 = "SELECT * FROM user JOIN sensor ON user.sensor_id = sensor.stationId WHERE user.stationName = ?";
    con.query(sql1, [stationName], (err, joinedResult) => {
      if (err) {
        return res.json({ Status: false });
      }

      // Send the user object and the joined result separately in the response JSON
      const response = {
        Status: true,
        User: userResult[0], // Assuming you only expect one user object
        JoinedData: joinedResult // The joined data from the second query
      };

      return res.json(response); // Return the response with user and joined data separately
    });
  });
});

router.put("/user_edit/:id", (req, res) => {
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


router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as UserRouter };
