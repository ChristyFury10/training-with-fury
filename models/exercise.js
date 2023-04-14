const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema ({
    name: String, 
    description: String,
    tags: [String],
    img: String,
})

const Exercise = mongoose.model("Exercise", ExerciseSchema, "exercises")

module.exports = Exercise;





// const WorkoutSchema = new mongoose.Schema({
//     name: String,
//     // exercise: [{type: mongoose.Types.ObjectId, ref: "workoutGroup"}]
// })



// const Exercise = mongoose.model("Exercise", ExerciseSchema);
// const Workout = mongoose.model("Workout", WorkoutSchema);

// const WESchema = new mongoose.Schema ({
//     workout: {type: mongoose.Types.ObjectId, ref: Exercise},
//     exercise: {type: mongoose.Types.ObjectId, ref: Workout}
// })

// const WERel = mongoose.model("WERel", WESchema);


// module.exports = {Exercise, Workout, WERel};