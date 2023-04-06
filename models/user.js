// require mongoose, already connected in connection.js in db folder in
const {model, Schema} = require("../db/connection");

const Exercise = new Schema({
    name: String, 
    description: String,
    tags: [],
    img: String,
    progression: String,
    regression: String,
    prevResistance: Number
});

const Workout = new Schema ({
    name: String, 
    description: String,
    tags: [],
    exercises: [Exercise]
})


const userSchema = new Schema({
    username: {type:String, unique: true, required: true},
    password: {type:String, required: true}, 
    createdWorkouts: [Workout]

}, {timeStamps: true})

const User = model("User", userSchema);

module.exports = User;