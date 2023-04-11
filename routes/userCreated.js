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

router.get("/:id/edit", async (req, res)=>{
    const exercise = await UserExercise.findById(req.params.id)
    res.render("edit.ejs", {exercise})
});

router.put("/:id", async (req, res)=>{
    const id = req.params.id;
    const exercise = await UserExercise.findByIdAndUpdate(id, req.body, {new:true});
    res.redirect("./created")
});

router.delete("/:id", async (req, res)=>{
    const exercise = await UserExercise.findByIdAndDelete(req.params.id);
    res.redirect("./created");
})

router.get("/:id", async (req, res)=>{
    const id = req.params.id;
    const exercise = await UserExercise.findById(req.params.id)
    res.render("showEditable.ejs", {exercise, id})
})
module.exports = router;