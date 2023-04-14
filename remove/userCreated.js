// const router = require("express").Router();
// const UserExercise = require("../models/userExercise.js");
// const {seedExercises, workouts} = require("../db/seed.js");
// const {Exercise, Workout, WERel} = require("../models/exercise.js");

// //***Check auth? middlware */

// router.post("/add-new", async (req, res)=>{
//     const newExercise = await UserExercise.create(req.body);
//     res.redirect("./created")
// })

// router.get("/add-new", (req, res)=>{
//     res.render("new.ejs")
// })

// // router.get("/workouts", async (req, res)=>{

// // })

// // router.post("/workouts/:exercise/:workoutName", async (req, res)=>{
// //     const {workout, exercise} = req.params;
// //     const W = await Workout.findOne({name: workout});
// //     const E = await Exercise.findOne({name: exercise});
// //     res.json(await WERel.create({exercise: E._id, workout: W._id}))

// // })

// // router.get("/workouts/:exercise", async (req, res)=>{
// //     res.json(await WERel.find({exercise: req.params.exercise}).populate("exercise").populate("workout"))

// // })


// router.get("/created", async (req, res)=>{
//     const userExercises = await UserExercise.find({});
//     res.render("userCreated.ejs", {userExercises})
// })

// router.get('/seed', async (req, res) => {
// 	await UserExercise.deleteMany({});
// 	await UserExercise.create(seedExercises);
// 	res.redirect("created");
// });

// router.get("/:id/edit", async (req, res)=>{
//     console.log("------------");
//     console.log(req);
//     console.log("------------");
//     const exercise = await UserExercise.findById(req.params.id)
//     res.render("edit.ejs", {exercise})
// });

// router.put("/:id", async (req, res)=>{
//     const id = req.params.id;
//     const exercise = await UserExercise.findByIdAndUpdate(id, {$set: req.body}, {new:true});
//     res.redirect("./created")
// });

// router.delete("/:id", async (req, res)=>{
//     const exercise = await UserExercise.findByIdAndDelete(req.params.id);
//     res.redirect("./created");
// })

// router.get("/:id", async (req, res)=>{
//     const id = req.params.id;
//     const exercise = await UserExercise.findById(req.params.id)
//     res.render("showEditable.ejs", {exercise, id})
// })


// module.exports = router;