const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {seedExercises, Workouts} = require("../db/seed.js");
const Exercise = require("../models/exercise.js");
const log = (string)=> console.log(string)

router.get("/quadmania", async (req, res)=>{
    try{
    let workout = await Exercise.find( {'tags':"quad-mania"});
    res.render("workouts/quadmania.ejs", {workout})

    }
    catch{

    }
});

module.exports = router;