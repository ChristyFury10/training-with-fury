const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {seedExercises, Workouts} = require("../db/seed.js");
const Exercise = require("../models/exercise.js");
const log = (string)=> console.log(string)

//middleware
// router.use("/auth", authRouter);//
// router.use("/user", userRouter);

//==============ROUTES============================

//INDEX --------------------->
router.get("/", async (req, res)=>{
    try{
    const exercises = await Exercise.find({});
    res.render("index.ejs", {exercises})
    }
    catch(err){
        // console.log(err);
        // next();
    }
});

// seed
router.get('/seed', async (req, res) => {
    try{
	await Exercise.deleteMany({});
	await Exercise.create(seedExercises);
	res.redirect('/exercises');
    }
    catch(err){
        // console.log(err);
        // next();
    }
});

router.get("/today", (req, res)=>{
    res.render("today.ejs")
})

// NEW ----------------------------->
router.get("/add-new", async (req, res)=>{
    try{
    res.render("new.ejs")
    }
    catch(err){
        // console.log(err);
        // next();
    }
});



//CREATE - AUTHENTICATION  -------------------> NOT READY
router.post("/add-new", async (req, res)=>{
    try{
    log(req.body);
    const exercise = await Exercise.create(req.body);
    res.redirect("/exercises")
    }
    catch(err){
        // console.log(err);
        // next();
    }
});

//EDIT - AUTHENTICATION  -------------------> NOT READY

router.get("/:id/edit", async (req, res)=>{
    try{
    // console.log("------------");
    // console.log(req);
    // console.log("------------");
    const exercise = await Exercise.findById(req.params.id)
    res.render("edit.ejs", {exercise})
    }
    catch(err){
        // console.log(err);
        // next();
    }
});

router.put("/:id", async (req, res)=>{
    try{
    const id = req.params.id;
    req.body.tags = req.body.tags.split(",")
    console.log(req.body.tags) 
    // if empty set equal to empty string, emty string as default
    const exercise = await Exercise.findByIdAndUpdate(id, {$set: req.body}, {new:true});
    res.redirect("/exercises")
    }
    catch(err){
        // console.log(err);
        // next();
    }
});

router.delete("/:id", async (req, res)=>{
    try{
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.redirect("/exercises");
    }
    catch(err){
        // console.log(err);
        // next();
    }
});

router.get("/arms", async (req, res)=>{
    try{
    const armsExercises= await 
    Exercise.find( { $or:[ {'tags': "arms"}, {'tags':"upper-body"} ]});
    res.render("arms.ejs", {armsExercises})
    }
    catch(err){
        // console.log(err);
        // next();
    }
});

router.get("/legs", async (req, res)=>{
    try{
    const legsExercises= await 
    Exercise.find( { $or:[ {'tags': "legs"}, {'tags':"lower-body"} ]});
    res.render("legs.ejs", {legsExercises})
    }
    catch(err){
        // console.log(err);
        // next();
    }
})

router.get("/core", async (req, res)=>{
    try{
    const coreExercises= await 
    Exercise.find( { $or:[ {'tags': "core"}, {'tags':"abs"} ]});
    res.render("core.ejs", {coreExercises})
    }
    catch(err){
    //     console.log(err);
    //     next();
    }
});


//SHOW   ----------------->
router.get("/:id", async (req, res)=>{
    try{
    const id = req.params.id;
    const exercise = await Exercise.findById(req.params.id)
    res.render("show.ejs", {exercise, id})
    }
    catch(err){
        // console.log(err);
        // next();
    }
});


module.exports = router;