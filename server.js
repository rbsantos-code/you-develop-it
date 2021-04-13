const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// add EXPRESS middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




// route to handle user request that are not supported
app.use((req, res) => {
    res.status(404).end();
});

// function to start EXPRESS
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
});