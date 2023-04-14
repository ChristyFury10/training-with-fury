const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const authRouter = require("./auth");
const {seedExercises, Workouts} = require("../db/seed.js");
const Exercise = require("../models/exercise.js");
// const userRouter = require("./userCreated")
const log = (string)=> console.log(string)

//middleware
// router.use("/auth", authRouter);//
// router.use("/user", userRouter);

//==============ROUTES============================

//INDEX --------------------->
router.get("/", async (req, res)=>{
    const exercises = await Exercise.find({});
    res.render("index.ejs", {exercises})
});

// seed
router.get('/seed', async (req, res) => {
	await Exercise.deleteMany({});
	await Exercise.create(seedExercises);
	res.redirect('/exercises');
});

// NEW ----------------------------->
router.get("/add-new", async (req, res)=>{
    res.render("new.ejs")
});

//SHOW   ----------------->
router.get("/:id", async (req, res)=>{
    const id = req.params.id;
    const exercise = await Exercise.findById(req.params.id)
    res.render("show.ejs", {exercise, id})
})

//CREATE - AUTHENTICATION  -------------------> NOT READY
router.post("/add-new", async (req, res)=>{
    log(req.body);
    const exercise = await Exercise.create(req.body);
    res.redirect("/exercises")
});

//EDIT - AUTHENTICATION  -------------------> NOT READY

router.get("/:id/edit", async (req, res)=>{
    console.log("------------");
    console.log(req);
    console.log("------------");
    const exercise = await Exercise.findById(req.params.id)
    res.render("edit.ejs", {exercise})
});

router.put("/:id", async (req, res)=>{
    const id = req.params.id;
    const exercise = await Exercise.findByIdAndUpdate(id, {$set: req.body}, {new:true});
    res.redirect("/exercises")
});

router.delete("/:id", async (req, res)=>{
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.redirect("/exercises");
})

// router.get("/premade", async (req, res)=>{
//     const exercises = await Exercise.find({});
//     res.render("premade_index", {exercises})
// });


// router.get("/images", async (req, res)=>{
//     const exercises = await Exercise.find({});
//     res.render("image_index", {exercises})
// })



// router.get("/arms", async (req, res)=>{
//     const armsExercises= await 
//     Exercise.find( { $or:[ {'tags': "arms"}, {'tags':"upper-body"} ]});
//     res.render("arms.ejs", {armsExercises})
// })

// router.get("/legs", async (req, res)=>{
//     const legsExercises= await 
//     Exercise.find( { $or:[ {'tags': "legs"}, {'tags':"lower-body"} ]});
//     res.render("legs.ejs", {legsExercises})
// })

// router.get("/core", async (req, res)=>{
//     const coreExercises= await 
//     Exercise.find( { $or:[ {'tags': "core"}, {'tags':"abs"} ]});
//     res.render("core.ejs", {coreExercises})
// });

// router.get("/today", (req, res)=>{
//     res.render("today.ejs")
// })





module.exports = router;