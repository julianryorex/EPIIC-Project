const path = require('path');
const express = require('express');
const cors = require('cors');

const ENV = process.env.NODE_ENV; // choose if in production or development
const PORT = process.env.PORT || 8080;

const app = express();
const routes = require("./routes/routes");

app.use(cors());
app.use(express.json());


// add api routes here
app.use('/api', routes);


// serve static assets if in production
if(ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.get('/', (req, res) => {
    res.write("Connected to EPIIC Center REST API\n");
    res.write("Please enter a valid route to access this API!\n");
    res.end();
});



app.listen(PORT, () => {
    console.log("Hello");
    console.log(`Server listening on port ${PORT}...`);

});

module.exports = app;
