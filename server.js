const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

// imports
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// add EXPRESS middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('./api', apiRoutes);



// ROUTE FOR ALL PARTIES
app.get('/api/parties', (req, res) => {
   const sql = `SELECT * FROM parties`;

   db.query(sql, (err, rows) => {
       if (err) {
           res.status(500).json({ error: err.message });
           return;
       }
       res.json({
           message: 'success',
           data: rows
       });
   });
});

// ROUTE FOR SINGE PARTY
app.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id =?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});



// ADD DELETE ROUTE PARTIES
app.delete('/api/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // checks if anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Party not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


// route to handle user request that are not supported
app.use((req, res) => {
    res.status(404).end();
});

// function to start EXPRESS
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
});