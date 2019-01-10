const express = require('express');
const router = express.Router();
const pg = require('pg');

// DB CONNECTION
const Pool = pg.Pool;

// Configure database connection pool
const pool = new Pool({
    database: 'koala-holla',
    host: 'localhost',
    port: 5432,
    max: 10, // maximum number of database connections
    idleTimeoutMillis: 10000 // 10 seconds
});

// GET

// Return an array of all koalas in database (via GET)
router.get('/', (req, res) => {
    console.log(`--- In /koalas GET`);
    const sqlText = `
    SELECT * FROM "koalas"
    ORDER BY "name"
    LIMIT 25;
    `;
    pool.query(sqlText).then(function (sqlResult) {
        console.log(sqlResult);
        res.send(sqlResult.rows);
    }).catch(function (sqlError) {
        console.log(`SQL error in /koalas GET: ${sqlError}`);
        res.sendStatus(500);
    });
});

// POST


// PUT


// DELETE

module.exports = router;