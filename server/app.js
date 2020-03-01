const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const ENV = process.env.NODE_ENV; // choose if in production or development
const PORT = process.env.PORT || 5000;

const app = express();
const routes = require("./routes/routes");
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json());

// add api routes here
app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
