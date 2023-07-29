// This file is for our express server to run
let express = require('express');

let states_api = require('./routes/states');

let path = require('path');

let app = express(); // let app use express

let vueAppPath = path.join(__dirname, 'client', 'dist');

app.use(express.static(vueAppPath));

app.use(express.json()); //Enables our web server to understand our clients request in JSON format

app.use('/api', states_api); // when accessing api, this will be available as /api/states

// Requests to server that is not found
app.use(function (req, res, next) {
  res.status(404).send('Not Found');
});

// Server problems
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('Server Error');
});

let server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server Running on ', server.address().port);
});
