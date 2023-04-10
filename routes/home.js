const router = require("express").Router();
const authRouter = require("./auth")
const seedExercises = require("../db/seed.js");
const Exercise = require("../models/exercise.js")

//middleware
router.use("/auth", authRouter);


router.get("/", (req, res)=>{
    res.render("home")
});

router.get("/dashboard", async (req, res)=>{
    res.render("dashboard")
});

router.get("/premade", async (req, res)=>{
    const exercises = await Exercise.find({});
    res.render("premade_index", {exercises})
})

router.get("/images", async (req, res)=>{
    const exercises = await Exercise.find({});
    res.render("image_index", {exercises})
})

router.get('/seed', async (req, res) => {
	await Exercise.deleteMany({});
	await Exercise.create(seedExercises);
	res.redirect('/premade');
});

router.get("/arms", async (req, res)=>{
    const armsExercises= await 
    Exercise.find( { $or:[ {'tags': "arms"}, {'tags':"upper-body"} ]});
    res.render("arms.ejs", {armsExercises})
})

router.get("/legs", async (req, res)=>{
    const legsExercises= await 
    Exercise.find( { $or:[ {'tags': "legs"}, {'tags':"lower-body"} ]});
    res.render("legs.ejs", {legsExercises})
})

router.get("/core", async (req, res)=>{
    const coreExercises= await 
    Exercise.find( { $or:[ {'tags': "core"}, {'tags':"abs"} ]});
    res.render("core.ejs", {coreExercises})
})

module.exports = router;