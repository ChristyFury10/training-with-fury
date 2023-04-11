const router = require("express").Router();
const UserExercise = require("../models/userExercise.js");

//***Check auth? middlware */

router.post("/add-new", async (req, res)=>{
    const newExercise = await UserExercise.create(req.body);
    res.redirect("./created")
})

router.get("/add-new", (req, res)=>{
    res.render("new.ejs")
})

router.get("/created", async (req, res)=>{
    const userExercises = await UserExercise.find({});
    res.render("userCreated.ejs", {userExercises})
})

router.get("/:id", async (req, res)=>{
    const id = req.params.id;
    const exercise = await UserExercise.findById(req.params.id)
    res.render("showEditable.ejs", {exercise, id})
})

module.exports = router;