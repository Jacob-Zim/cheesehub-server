'use strict';
const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  location: String
});

spotSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Spot', spotSchema);