require('dotenv').config();
const express = require('express');
const mysql = require("mysql2");
const cors = require('cors')
const bodyParser = require('body-parser');
const PORT = 5000;

const app = express();

app.use(cors());


app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL database!");
  }
});

app.post("/add-user", (req, res) => {
  const { firstName, lastName, accountType, email, password } = req.body;
  console.log('req.body::: ', req.body);

  const sql = `INSERT INTO users (first_name, last_name, accountType, email, password) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [firstName, lastName, accountType, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "User created successfully", userId: result.insertId });
  });
});


app.get("/get-user", async (req, res) => {
  try {
    const { username } = req.query;
    console.log('req.query email ---> ', username);

    const sql = `SELECT * FROM users WHERE email = ?`;
    
    db.query(sql, [username], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if(result.length === 0){
        return res.status(500).json({message:"Data Not found"});
      }
      console.log('result::: ', result);
      res.status(200).json({
        message: "Data fetched successfully",
        data: result
      });
    });
    
  } catch (error) {
    console.log('error::: ', error);
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:${PORT}`);
});

