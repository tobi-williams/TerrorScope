const express = require('express');
const mariadb = require('mysql2');
const cors = require('cors');
require('./credentials');
const PORT = process.env.PORT || 3001;
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const detailsQuery = fs.readFileSync('./server/queries/detailsQuery.sql', 'utf8');
const locationQuery = fs.readFileSync('./server/queries/locationQuery.sql', 'utf8');
const yearQuery = fs.readFileSync('./server/queries/yearQuery.sql', 'utf8');
const perpQuery = fs.readFileSync('./server/queries/perpQuery.sql', 'utf8');
const weaponQuery = fs.readFileSync('./server/queries/weaponQuery.sql', 'utf8');

const connectionPool = mariadb.createPool({
    host: process.env.DBHOSTNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWD,
    database: process.env.DBNAME,
    connectionLimit: 10
});

app.post("/api/id", (req, res) => {
    const { id } = req.body;

    connectionPool.query(detailsQuery, [`${id}`], (err, results) => {
        if (err) {
            console.error('Database query error', err);
            res.status(500).send('An error occured while fetching data');
        } else {
            //console.log(id);
            res.json(results);
        }
    });
});

app.post("/api", (req, res) => {
    const { search, filter } = req.body;
    
    const query = "SELECT event_details.event_id AS id, concat_ws('/', event_month, event_day, event_year) as 'event date', coalesce(motive, 'MOTIVE UNKNOWN') as motive, coalesce(summary, 'SUMMARY UNAVAILABLE') as summary FROM event_details where cast(event_id as char) like ?";

    if (filter === '') {
        connectionPool.query(query, [`${search}%`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                //console.log(search);
                res.json(results);
            }
        });
    }
    else if (filter === 'location') {
        connectionPool.query(locationQuery, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                //console.log(search);
                res.json(results);
            }
        });
    }
    else if (filter === 'year') {
        connectionPool.query(yearQuery, [`${search}`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                //console.log(search);
                res.json(results);
            }
        });
    }
    else if (filter === 'perp') {
        connectionPool.query(perpQuery, [`%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                //console.log(search);
                res.json(results);
            }
        });
    }
    else if (filter === 'weapon') {
        connectionPool.query(weaponQuery, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                //console.log(search);
                res.json(results);
            }
        });
    }
    else {
        connectionPool.query("SELECT * FROM event_details WHERE event_id = ?", [`${search}`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                //console.log(search);
                res.json(results);
            }
        });
    }
});


app.use(express.static(__dirname));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});