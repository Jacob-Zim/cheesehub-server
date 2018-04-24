'use strict';
const express = require('express');
const router = express.Router();

const Spot = require('../models/Spot');

router.get('/spots', (req, res, next) => {
  Spot.find()
    .then(results => (
      res.json(results)
    ));
});
  
router.get('/spots/:id', (req, res, next) => {
  const spotId = req.params.id;
  Spot.findById(spotId)
    .then(result => {
      res.json(result);
    });
});
  
router.post('/spots', (req, res, next) => {
  Spot.create({lat:req.body.lat,lng:req.body.lng})
    .then(result => {
      res.json(result);
    });
});
  
router.put('/spots/:id', (req, res, next) => {
  const spotId = req.params.id;
  console.log(spotId);
  Spot.findByIdAndUpdate(spotId, {location:req.body.location})
    .then(result => {
      res.json(result);
    });
});
  
router.delete('/spots/:id', (req, res, next) => {
  const spotId = req.params.id;
  Spot.findByIdAndRemove(spotId)
    .then(result => {
      res.json(result);
    });
});

module.exports = router;