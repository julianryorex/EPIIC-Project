const express = require('express');
const path = require('path');

const app = express(); // initialize express

const members = [
    {
        id: '3',
        name: 'Julian',
        lastName: 'Rex'
    }
];

// middleware
// const logger = (req, res, next) => {
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// };   


// get single member
app.get('/:id', (req, res) => {
    res.send(req.params.id);
});
 
// app.use(logger);

// create endpoints/route
app.get('/api/members', (req, res) => {
    res.json(req.members.id);

});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000; // for deployment, if not 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});