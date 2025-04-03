const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.Host,
  user: process.env.User,
  password: process.env.Password,
  database: process.env.DataBase
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('App started on port 3000');
});
