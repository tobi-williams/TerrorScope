const express = require('express');
const mariadb = require('mysql2');
const cors = require('cors');
require('./credentials');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const connectionPool = mariadb.createPool({
    host: process.env.DBHOSTNAME, //AWS RDS MariaDB endpoint
    user: process.env.DBUSER,
    password: process.env.DBPASSWD,
    database: process.env.DBNAME,
    //port: '3306',
    connectionLimit: 10
});

app.post("/api", (req, res) => {
    const { search, filter } = req.body;
    const query = "SELECT event_details.event_id AS id, concat_ws('/', event_month, event_day, event_year) as 'event date', coalesce(motive, 'MOTIVE UNKNOWN') as motive, coalesce(summary, 'SUMMARY UNAVAILABLE') as summary FROM event_details where cast(event_id as char) like ?";
    
    const location_query = "SELECT event_details.event_id AS id, CONCAT_WS('/', event_details.event_month, event_details.event_day, event_details.event_year) AS 'event date', event_location.country AS country, event_location.province_state AS 'province/state', event_perpetrator_details.group_name1 AS 'major perpetrator', event_target_victim_details.target1_id AS target, CONCAT(event_weapon_details.weapon1_type, ' (', COALESCE(event_weapon_details.weapon1_subtype, 'UNKNOWN'), ')') AS weapon FROM event_details INNER JOIN event_location ON event_details.event_id = event_location.event_id INNER JOIN event_perpetrator_details ON event_location.event_id = event_perpetrator_details.event_id INNER JOIN event_target_victim_details ON event_perpetrator_details.event_id = event_target_victim_details.event_id INNER JOIN event_weapon_details ON event_target_victim_details.event_id = event_weapon_details.event_id WHERE event_location.region LIKE ? OR event_location.country LIKE ? OR event_location.province_state LIKE ? OR event_location.city LIKE ? OR event_location.specific_location LIKE ?";
    
    const year_query = "SELECT event_details.event_id AS id, CONCAT_WS('/', event_details.event_month, event_details.event_day, event_details.event_year) AS 'event date', event_location.country AS country, event_location.province_state AS 'province/state', event_perpetrator_details.group_name1 AS 'major perpetrator', event_target_victim_details.target1_id AS target, CONCAT(event_weapon_details.weapon1_type, ' (', COALESCE(event_weapon_details.weapon1_subtype, 'UNKNOWN'), ')') AS weapon FROM event_details INNER JOIN event_location ON event_details.event_id = event_location.event_id INNER JOIN event_perpetrator_details ON event_location.event_id = event_perpetrator_details.event_id INNER JOIN event_target_victim_details ON event_perpetrator_details.event_id = event_target_victim_details.event_id INNER JOIN event_weapon_details ON event_target_victim_details.event_id = event_weapon_details.event_id WHERE event_details.event_year = ?";

    const perp_query = "SELECT event_details.event_id AS id, CONCAT_WS('/', event_details.event_month, event_details.event_day, event_details.event_year) AS 'event date', event_location.country AS country, event_location.province_state AS 'province/state', CONCAT('(', event_perpetrator_details.group_name1, '), ', '(', COALESCE(event_perpetrator_details.group_name2, 'N/A'), '), ', '(', COALESCE(event_perpetrator_details.group_name3, 'N/A'), ')') AS 'perpetrator(s)', event_target_victim_details.target1_id AS target FROM event_details INNER JOIN event_location ON event_details.event_id = event_location.event_id INNER JOIN event_perpetrator_details ON event_location.event_id = event_perpetrator_details.event_id INNER JOIN event_target_victim_details ON event_perpetrator_details.event_id = event_target_victim_details.event_id WHERE event_perpetrator_details.group_name1 LIKE ? OR event_perpetrator_details.group_name2 LIKE ? OR event_perpetrator_details.group_name3 LIKE ?";

    const weapon_query = "SELECT event_details.event_id AS id, CONCAT_WS('/', event_details.event_month, event_details.event_day, event_details.event_year) AS 'event date', event_location.country AS country, event_location.province_state AS 'province/state', CONCAT('(', event_perpetrator_details.group_name1, '), ', '(', COALESCE(event_perpetrator_details.group_name2, 'N/A'), '), ', '(', COALESCE(event_perpetrator_details.group_name3, 'N/A'), ')') AS 'perpetrator(s)', event_target_victim_details.target1_id AS target, CONCAT('(', event_weapon_details.weapon1_subtype, '), ', '(', COALESCE(event_weapon_details.weapon2_subtype, 'N/A'), '), ', '(', COALESCE(event_weapon_details.weapon3_subtype, 'N/A'), ')', '(', COALESCE(event_weapon_details.weapon4_subtype, 'N/A'), ')') AS 'weapon(s)', event_weapon_details.weapon_detail AS detail FROM event_details INNER JOIN event_location ON event_details.event_id = event_location.event_id INNER JOIN event_perpetrator_details ON event_location.event_id = event_perpetrator_details.event_id INNER JOIN event_target_victim_details ON event_perpetrator_details.event_id = event_target_victim_details.event_id INNER JOIN event_weapon_details ON event_target_victim_details.event_id = event_weapon_details.event_id WHERE event_weapon_details.weapon1_type LIKE ? OR event_weapon_details.weapon2_type LIKE ? OR event_weapon_details.weapon3_type LIKE ? OR event_weapon_details.weapon4_type LIKE ? OR event_weapon_details.weapon1_subtype LIKE ? OR event_weapon_details.weapon2_subtype LIKE ? OR event_weapon_details.weapon3_subtype LIKE ? OR event_weapon_details.weapon4_subtype LIKE ?";

    if (filter === '') {
        connectionPool.query(query, [`${search}%`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                console.log(search);
                res.json(results);
            }
        });
    }
    else if (filter === 'location') {
        connectionPool.query(location_query, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                console.log(search);
                res.json(results);
            }
        });
    }
    else if (filter === 'year') {
        connectionPool.query(year_query, [`${search}`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                console.log(search);
                res.json(results);
            }
        });
    }
    else if (filter === 'perp') {
        connectionPool.query(perp_query, [`%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                console.log(search);
                res.json(results);
            }
        });
    }
    else if (filter === 'weapon') {
        connectionPool.query(weapon_query, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                console.log(search);
                res.json(results);
            }
        });
    }
    else {
        connectionPool.query("SELECT * FROM event_details WHERE event_id = ?", ['197001010002'], (err, results) => {
            if (err) {
                console.error('Database query error', err);
                res.status(500).send('An error occured while fetching data');
            } else {
                console.log(search);
                res.json(results);
            }
        });
    }
});

// Handling static files and SPA routing
app.use(express.static(__dirname)); // If you serve React build static files
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});