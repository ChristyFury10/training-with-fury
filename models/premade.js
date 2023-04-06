const {model, Schema} = require("../db/connection");

const premadeExercise = new Schema ({
    name: String, 
    description: String,
    tags: [],
    img: String,
    progression: String,
    regression: String,
    prevResistance: Number, 
    user: {type: Schema.Types.ObjectId, ref: "User"}
})

const premadeWorkoutSchema = new Schema ({
    name: String, 
    description: String,
    tags: [],
    exercises: [premadeExercise],
    user: {type: Schema.Types.ObjectId, ref: "User"}
}, {timeStamps: true});



const premadeWorkout = model("premade", premadeWorkoutSchema)

module.exports = premadeWorkout;