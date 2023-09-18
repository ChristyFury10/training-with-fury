const { mongoose } = require('../db/connection');

const ExerciseSchema = new mongoose.Schema ({
    name: String, 
    description: String,
    tags: [String],
    img: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
}
});

ExerciseSchema.pre("findOne", function(next){
    this.populate("user");
    next();
});

ExerciseSchema.pre("find", function(next){
    this.populate("user");
    next();
});

const Exercise = mongoose.model("Exercise", ExerciseSchema, "exercises")

module.exports = Exercise;


