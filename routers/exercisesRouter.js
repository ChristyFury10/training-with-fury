const express = require("express");
const router = express.Router();
const authRouter = require("../routers/authRouter.js");
// const mongoose = require("mongoose");
const {seedExercises, Workouts} = require("../db/seed.js");
const Exercise = require("../models/exercise.js");
const log = (string)=> console.log(string)


//middleware
router.use("/auth", authRouter);
// router.use("/user", userRouter);

//==============ROUTES============================

//INDEX --------------------->
router.get("/", async (req, res)=>{
    try{
    const exercises = await Exercise.find({});
    let user;
    if (req.session.currentUser){
        user = req.session.currentUser;
        console.log(user)
    }
    res.render("index.ejs", {exercises, user})
    }
    catch (error) {
        console.log('error', error)
    }
});

// seed
router.get('/seed', async (req, res) => {
    try{
	await Exercise.deleteMany({});
	await Exercise.create(seedExercises);
	res.redirect('/exercises');
    }
    catch (error) {
        console.log('error', error)
    }
});

router.get("/usercreated", async (req, res)=>{
    res.send("user created page here")
})

router.get("/today", (req, res)=>{
    let user;
    if (req.session.currentUser){
        user = req.session.currentUser;
        console.log(user)
    }
    res.render("today.ejs", {user})
})

// NEW ----------------------------->
router.get("/add-new", async (req, res)=>{
    try{
        let user;
    if (req.session.currentUser){
        user = req.session.currentUser;
        console.log(user);
        
    }
    res.render("new.ejs", {user})
    }
    catch (error) {
        console.log('error', error)
    }
});



//CREATE - AUTHENTICATION  -------------------> NOT READY
router.post("/add-new", async (req, res)=>{
    try{
        if (req.session.currentUser){
            user = req.session.currentUser;
            console.log(user)
        }
    // log(req.body);
    const exercise = await Exercise.create(req.body);
    exercise.user = user.id;
    // console.log("user", exercise.user)
    res.redirect("/exercises")
    }
    catch (error) {
        console.log('error', error)
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
    catch (error) {
        console.log('error', error)
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
    catch (error) {
        console.log('error', error)
    }
});

router.delete("/:id", async (req, res)=>{
    try{
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.redirect("/exercises");
    }
    catch (error) {
        console.log('error', error)
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
    catch (error) {
        console.log('error', error)
    }
})

router.get("/core", async (req, res)=>{
    try{
    const coreExercises= await 
    Exercise.find( { $or:[ {'tags': "core"}, {'tags':"abs"} ]});
    res.render("core.ejs", {coreExercises})
    }
    catch (error) {
        console.log('error', error)
    }
});


//SHOW   ----------------->
router.get("/:id", async (req, res)=>{
    try{
        if (req.session.currentUser){
            user = req.session.currentUser;
            console.log(user)
        }
    const id = req.params.id;
    const exercise = await Exercise.findById(req.params.id)
    res.render("show.ejs", {exercise, id, user})
    }
    catch (error) {
        console.log('error', error)
    }
});


module.exports = router;