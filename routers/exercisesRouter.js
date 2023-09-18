const express = require("express");
const router = express.Router();
const authRouter = require("../routers/authRouter.js");
const mongoose = require("mongoose");
const {seedExercises, Workouts} = require("../db/seed.js");
const Exercise = require("../models/exercise.js");
const log = (string)=> console.log(string);
let user = null;
var urlExists = require("url-exists")

const defaultImgURL = "https://cdn.pixabay.com/photo/2017/01/31/08/48/barbell-2023339__340.png"


//middleware
router.use("/auth", authRouter);
// router.use("/user", userRouter);

//==============ROUTES============================

//INDEX --------------------->
router.get("/", async (req, res)=>{
    try{
    let loggedIn = false;
    let user;
    const exercises = await Exercise.find({});
    if (req.session.currentUser){
        loggedIn = true;
        
        user = req.session.currentUser;
        // console.log(user)
        res.render("index.ejs", {exercises, user, loggedIn});
        console.log(user)
    }
    else{
        res.render("index.ejs", {exercises, loggedIn, user});
    }
    
    }
    
    catch (error) {
        console.log('error', error)
    }
});

// seed
// router.get('/seed', async (req, res) => {
//     try{
// 	await Exercise.deleteMany({});
// 	await Exercise.create(seedExercises);
// 	res.redirect('/exercises');
//     }
//     catch (error) {
//         console.log('error', error)
//     }
// });

router.get("/usercreated", async (req, res)=>{
    let loggedIn = false;
    let user;
    if (req.session.currentUser){
        loggedIn = true;
        user = req.session.currentUser;
        // console.log(user);
        exercises = await Exercise.find({"user": req.session.currentUser.id.toString()})
        // console.log(exercises);
         res.render("userExercisesIndex.ejs", {user, loggedIn, exercises})
    }
    else{
        res.render("userExercisesIndex.ejs", {loggedIn})
    }
    
})

router.get("/today", (req, res)=>{
    let user;
    let loggedIn = false;
    if (req.session.currentUser){
        loggedIn = true;
        user = req.session.currentUser;
        console.log(user);
         res.render("today.ejs", {user,loggedIn})
    }
    else{
        res.render("today.ejs", {loggedIn})
    }
   
})

// NEW ----------------------------->
router.get("/add-new", async (req, res)=>{
    try{
        let user;
        let loggedIn = false;
    if (req.session.currentUser){
        loggedIn = true;
        user = req.session.currentUser;
        console.log(user);
        res.render("new.ejs", {user, loggedIn})
    }
    else{
        res.send("must be logged in to add an exercise")
    }
    
    }
    catch (error) {
        console.log('error', error)
    }
});



//CREATE - AUTHENTICATION  -------------------> NOT READY
router.post("/add-new", async (req, res)=>{
    try{
        let loggedIn = false;
        if (req.session.currentUser){
            loggedIn = true;
            user = req.session.currentUser;
            console.log(user)
        }
    // log(req.body);
    const exercise = await Exercise.create(req.body);
    exercise.user = user.id;
    // let validURL;
    // console.log(req.body.img)
    // urlExists(req.body.img.toString(), function(err, exists) {
    //     console.log(exists);
    // //     if (!exists){
    // //     console.log("invalid url");
    // //     exercise.img = defaultImgURL.toString();
    
    // });
    
    
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
        
    const exercise = await Exercise.findById(req.params.id)
    let loggedIn = false;
    if (req.session.currentUser){
        loggedIn = true;
        user = req.session.currentUser;
        console.log(user)
        res.render("edit.ejs", {exercise, loggedIn, user})
    }
    
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
    let loggedIn;
    if (req.session.currentUser){
        let user;
        loggedIn = true;
        user = req.session.currentUser;
        console.log(user)
        res.redirect("/exercises");
    }
   
    }
    catch (error) {
        console.log('error', error)
    }
});

router.get("/arms", async (req, res)=>{
    try{
        let loggedIn = false;
    const armsExercises= await 
    Exercise.find( { $or:[ {'tags': "arms"}, {'tags':"upper-body"} ]});
    if (req.session.currentUser){
        let user;
        loggedIn = true;
        user = req.session.currentUser;
        res.render("arms.ejs", {armsExercises, user, loggedIn})
    }
    else {
        res.render("arms.ejs", {armsExercises, loggedIn})
    }
    }
    catch(err){
        // console.log(err);
        // next();
    }
});

router.get("/legs", async (req, res)=>{
    try{
        let loggedIn = false;
    const legsExercises= await 
    Exercise.find( { $or:[ {'tags': "legs"}, {'tags':"lower-body"} ]});
    if (req.session.currentUser){
        let user;
        loggedIn = true;
        user = req.session.currentUser;
        res.render("legs.ejs", {legsExercises, user, loggedIn})
    }
    else {
        res.render("legs.ejs", {legsExercises, loggedIn})
    }
    }
    catch (error) {
        console.log('error', error)
    }
})

router.get("/core", async (req, res)=>{
    try{
        let loggedIn = false;
    const coreExercises= await 
    Exercise.find( { $or:[ {'tags': "core"}, {'tags':"abs"} ]});
    if (req.session.currentUser){
        let user;
        loggedIn = true;
        user = req.session.currentUser;
        res.render("core.ejs", {coreExercises, user, loggedIn})
    }
    else {
        res.render("core.ejs", {coreExercises, loggedIn})
    }
    }
    catch (error) {
        console.log('error', error)
    }
});


//SHOW   ----------------->
router.get("/:id", async (req, res)=>{
    const id = req.params.id;
    let loggedIn = false;
    let usersExercise = false;
    const exercise = await Exercise.findById(req.params.id)
    try{
        if (req.session.currentUser){
            loggedIn = true;
            user = req.session.currentUser;
            if(exercise.user){
            if(exercise.user.id === user.id.toString()){
                usersExercise = true;
            }
        }
        }
        res.render("show.ejs", {exercise, id, user, loggedIn, usersExercise})
    }
    catch (error) {
        console.log('error', error)
    }
});


module.exports = router;