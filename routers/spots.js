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
  console.log(req.body);
  Spot.create({lat:req.body.lat, lng:req.body.lng, name:req.body.name, notes:req.body.notes, rating:req.body.rating})
    .then(result => {
      res.json(result);
    });
});
  
router.put('/spots/:id', (req, res, next) => {
  const spotId = req.params.id;
  const { lat, lng, name, notes, rating } = req.body;
  const newSpot = { lat, lng, name, notes, rating };
  Spot.findByIdAndUpdate(spotId, newSpot, {new:true})
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