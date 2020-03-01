const express = require("express");
const app = express();


app.get('/', (req, res) => {
    res.send("Inside authenticate.js file.\n");
});


module.exports = app;