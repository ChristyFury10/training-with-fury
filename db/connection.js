// import mongoose
const mongoose = require("mongoose");
// require("dotenv").config();

//connect mongoose woth mongoDB url
// mongoose.connect(process.env.DATABASE_URL);
mongoose.connect('mongodb+srv://project:4KjGdOWhaAQWN520@cluster0.qs3kxed.mongodb.net/exercisesDB?retryWrites=true&w=majority', {useNewUrlParser: true});

// export mongoose so that models can interface with it
module.exports= {mongoose};
