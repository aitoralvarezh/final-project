const mysql = require('mysql2/promise');

const {
    DATABASE_HOST,
    DATABASE_USER,
    DATABASE_NAME,
    DATABASE_PASSWORD,
} = process.env;

const pool = mysql.createPool({
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD
});

module.exports = { pool };