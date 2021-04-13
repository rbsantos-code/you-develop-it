const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// add EXPRESS middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




// route to handle user request that are not supported
app.use((req, res) => {
    res.status(404).end();
});

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your MySQL username
        user: 'root',
        // your MySQL password,
        password: 'RBBootcamp91',
        database: 'election'
    },
    console.log('Connected to the election database.')
)

// return all the data in the candidates tables -12.2.4
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// GET a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

// DELETE a candidate 
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?, ?, ?, ?)`;

const params = [ 1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

// function to start EXPRESS
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
});