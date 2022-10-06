export {}
const mysql = require("mysql2");
let db;

try {
  db = mysql.createConnection({
    host: '127.0.0.1',
    user : 'testuser',
    password: '1234',
    database: 'TESTDB',
    port: '3306',
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0,
  });
} catch (err) {
  console.error(err);
}

module.exports = db;