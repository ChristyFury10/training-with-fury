const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {seedExercises, Workouts} = require("../db/seed.js");
const Exercise = require("../models/exercise.js");
const log = (string)=> console.log(string)

router.get("/quadmania", (req, res)=>{
    res.render("workouts/quadmania.ejs")
})

module.exports = router;