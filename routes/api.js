const db = require("../models");
var router = require('express').Router();

router.put("/api/workouts/:id", function(req,res){
    const idNeeded = req.params.id
    db.Workout.findOneAndUpdate({ _id: idNeeded }, { $push: { exercises: req.body } }, { new: true })
    .then(Workout => {
        res.json(Workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

router.post("/api/workouts", function(req,res){
    db.Workout.create(req.body)
    .then(results => {
        res.json(results);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

router.get("/api/workouts", function(req, res){

    db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" } ,
          }
        }
    ])
    .then(Workout => {
        res.json(Workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})  

router.get("/api/workouts/range", function(req, res){
    db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" } ,
          }
        }
    ])
    .sort({day: "desc"})
    .limit(7)
    .sort({day: "asc"})
    .then(Workout => {
        res.json(Workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

module.exports = router