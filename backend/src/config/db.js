import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "praveen",
  password: "Mysqladmin@password",
  database: "ecommerce_app",
  port: "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export default db;
