const express = require('express');
const mariadb = require('mysql2');
require('./credentials');
const PORT = process.env.PORT || 3001;

const app = express();

const connectionPool = mariadb.createPool({
    host: process.env.DBHOSTNAME, //AWS RDS MariaDB endpoint
    user: process.env.DBUSER,
    password: process.env.DBPASSWD,
    database: process.env.DBNAME,
    port: '3306',
    connectionLimit: 10
});

app.get("/api", (req, res) => {
    connectionPool.query('SELECT event_year FROM event_details', (err, results) => {
        if (err) {
            console.error('Database query error', err);
            res.status(500).send('An error occured while fetching data');
        } else {
            console.log('Success');
            res.json(results);
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});