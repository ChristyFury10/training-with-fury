const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {seedExercises, Workouts} = require("../db/seed.js");
const Exercise = require("../models/exercise.js");
const log = (string)=> console.log(string)

router.get("/quadmania", async (req, res)=>{
    try{
    let workout = await Exercise.find( {'tags':"quad-mania"});
    let loggedIn = false;
    
    if (req.session.currentUser){
        let user;
        loggedIn = true;
        user = req.session.currentUser;
        res.render("workouts/quadmania.ejs", {workout, loggedIn, user})
    }
    else{
        res.render("workouts/quadmania.ejs", {workout, loggedIn})
    }
    }
    catch{

    }
});

module.exports = router;