
'use strict';
const express = require('express');
const router = express.Router();

const Spot = require('../models/Spot');

router.post('/spots', (req, res, next) => {
  Spot.create({lat:req.body.lat, lng:req.body.lng, name:req.body.name, notes:req.body.notes, rating:req.body.rating, userId:req.body.userId, address:req.body.address, image:req.body.image})
    .then(result => {
      res.json(result);
    });
});
  
router.put('/spots/:id', (req, res, next) => {
  const spotId = req.params.id;
  const { lat, lng, name, notes, rating, address, image, userId } = req.body;
  const newSpot = { lat, lng, name, notes, rating, address, image, userId };
  
  Spot.findById(spotId)
    .then(result => {
      if(`${result.userId}` !== userId) {
        return new Error('This spot does not belong to you');
      }
      if (`${result.userId}` === userId) {
        return Spot.findByIdAndUpdate(spotId, newSpot, {new:true})
          .then(result => {
            res.json(result);
          });
      }
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {

    });
});
  
router.delete('/spots/:id', (req, res, next) => {
  const spotId = req.params.id;
  const userId = req.body.userId;
  Spot.findById(spotId)
    .then(result => {
      if(`${result.userId}` !== userId) {
        return new Error('This spot does not belong to you');
      }
      if (`${result.userId}` === userId) {
        return Spot.findByIdAndRemove(spotId);
      }
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {

    });
});

module.exports = router;