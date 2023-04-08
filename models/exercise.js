const {mongoose} = require("../db/connection");

const ExerciseSchema = new mongoose.Schema ({
    name: String, 
    description: String,
    tags: [],
    img: String,
})

const Exercise = mongoose.model("Exercise", ExerciseSchema)

module.exports = Exercise;