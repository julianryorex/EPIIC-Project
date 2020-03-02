const path = require('path');
const express = require('express');
const cors = require('cors');

const ENV = process.env.NODE_ENV; // choose if in production or development
const PORT = process.env.PORT || 5000;

const app = express();
const routes = require("./routes/routes");
app.use(express.json());
// app.use(express.urlencoded({extended: false}));


// add api routes here
app.use(cors())
app.use('/api', routes);

app.get('/', (req,res) => {
    res.json()
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
