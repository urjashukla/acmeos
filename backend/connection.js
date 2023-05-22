const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = db;
