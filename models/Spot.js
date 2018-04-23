'use strict';
const { dbConnect } = require('./db-mongoose');

const spotSchema = new dbConnect.Schema({
  location: String
});

module.exports = dbConnect.model('Spot', spotSchema);