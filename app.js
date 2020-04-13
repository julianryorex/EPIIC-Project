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
        try{
            res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
        }
        catch(err) {
            console.error("Error in app.js GET request.");
			console.log(err);
            res.write("Problem displaying webpage...");
            res.write(err);
            res.end();
        }
        
    });
}

app.get('/', (req, res) => {

   
    
    try {
        res.write("Connected to EPIIC Center REST API\n");
        res.write("Please enter a valid route to access this API!\n");
        res.end();
    }
    catch(err) {
        
    }
})
.on("error", (err) => {
    console.error("Error in app.js GET request.");
	console.log(err);
	res.send(err);
});

// app.post('/', (req, res) => {
//     res.send("Error: nothing to POST request at this path.");
// });

// app.put("/", (req, res) => {
// 	res.send("Error: nothing to PUT request at this path.");
// });

// app.delete("/", (req, res) => {
// 	res.send("Error: nothing to DELETE request at this path.");
// });





app.listen(PORT, () => {
    console.log("Hello");
    console.log(`Server listening on port ${PORT}...`);

});

module.exports = app;
