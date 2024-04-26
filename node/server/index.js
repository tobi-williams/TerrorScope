const express = require('express');
const mariadb = require('mysql2');
const cors = require('cors');
require('./credentials');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

const connectionPool = mariadb.createPool({
    host: process.env.DBHOSTNAME, //AWS RDS MariaDB endpoint
    user: process.env.DBUSER,
    password: process.env.DBPASSWD,
    database: process.env.DBNAME,
    //port: '3306',
    connectionLimit: 10
});

app.get("/api", (req, res) => {
    connectionPool.query("SELECT concat_ws('/', event_month, event_day, event_year) as 'event date', coalesce(motive, 'MOTIVE UNKNOWN') as motive, coalesce(summary, 'SUMMARY UNAVAILABLE') as summary FROM event_details where cast(event_id as char) like ?", ['197001%'], (err, results) => {
        if (err) {
            console.error('Database query error', err);
            res.status(500).send('An error occured while fetching data');
        } else {
            console.log('Success');
            res.json(results);
        }
    });
});

// Handling static files and SPA routing
app.use(express.static(__dirname)); // If you serve React build static files
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});