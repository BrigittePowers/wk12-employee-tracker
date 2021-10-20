// external dependencies
const mysql2 = require('mysql2');
require('dotenv').config();
var figlet = require('figlet');

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
dbConnect.connect (err => {
    if (err) throw err;
    figlet('Town Portal', async function(err, data) {
        if (err) throw err;
        await console.log(data);
        await console.log('Version 2.0.1 by BrigittePowers');
        await console.log('~2021');
        await console.log(``);
        await console.log(``);
        await console.log(``);
        init();
    })
    
})