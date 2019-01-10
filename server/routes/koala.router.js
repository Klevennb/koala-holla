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
router.post('/', (req, res) => {
    console.log('In /koalas POST with', req.body);
    const newKoala = req.body;
    const queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
                            VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes])
        .then((response) => {
            console.log(response);
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`Error in POST /koalas`, error);
            res.sendStatus(500);
        });
    
});

// PUT


// DELETE

// Delete a koala from database based on koala's id (via DELETE)
router.delete('/:id', (req, res) => {
    const koalaId = req.params.id;
    console.log('In /koalas DELETE with');
    const queryText = `
    DELETE FROM "koalas"
    WHERE "id" = $1;
    `;
    pool.query(queryText, [koalaId])
        .then((response) => {
            console.log(response);
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`Error in DELETE /koalas`, error);
            res.sendStatus(500);
        });

});

module.exports = router;