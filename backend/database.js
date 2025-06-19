const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'rate_reviewdb'
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to DB:", err);
    return;
  }
  console.log("MySQL connected!");
});

module.exports = db;
