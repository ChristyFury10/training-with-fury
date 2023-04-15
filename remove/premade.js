// const {model, Schema} = require("../db/connection");

// const premadeExerciseSchema = new Schema ({
//     name: String, 
//     description: String,
//     tags: [],
//     img: String,
//     // progression: String, /// follow same logic as line 11
//     // regression: String,
//     // prevResistance: Number, 
//     user: {type: Schema.Types.ObjectId, ref: "User"}
// })

// const premadeWorkoutSchema = new Schema ({
//     name: String, 
//     description: String,
//     tags: [],
//     exercises: [{type: Schema.Types.ObjectName, ref: "premadeExerciseSchema"}],
//     user: {type: Schema.Types.ObjectId, ref: "User"}
// }, {timeStamps: true});



// const premadeWorkout = model("Premade", premadeWorkoutSchema)

// module.exports = premadeWorkout;