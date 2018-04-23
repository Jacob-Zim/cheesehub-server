'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');
const Spot = require('./models/Spot');
const app = express();

//create a spots router once I start on the next endpoint

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const names = { location: [
  'Test1'
]};

app.get('/spots', (req, res, next) => {
  Spot.find()
    .then(results => (
      res.json(results)
    ));
});

app.post('/spots', (req, res, next) => {
  const spot = {location:'new locon'};
  Spot.create(spot)
    .then(result => {
      res.json(result);
    });
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
