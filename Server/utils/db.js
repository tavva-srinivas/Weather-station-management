import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "weatherstationmanagement",
});

con.connect(function (err) {
  if (err) {
    console.log("Connection Failed");
  } else {
    console.log("Connected");
  }
});

export default con;
