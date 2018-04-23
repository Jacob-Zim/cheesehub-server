'use strict';
const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  location: String
});

module.exports = mongoose.model('Spot', spotSchema);