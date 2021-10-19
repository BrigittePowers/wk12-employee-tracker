// external dependencies
const mysql2 = require('mysql2');
require('dotenv').config();

// internal dependencies
const { init } = require('./util/functions');

// database connection
const dbConnect = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
dbConnect.connect(err => {
    if (err) throw err;
    init();
})