const {mongoose} = require("../db/connection");

const UserExerciseSchema = new mongoose.Schema ({
    name: String, 
    description: String,
    tags: [],
    img: String,
})

const UserExercise = mongoose.model("UserExercise", UserExerciseSchema)

module.exports = UserExercise;