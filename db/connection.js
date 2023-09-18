// import mongoose
const mongoose = require("mongoose");
// require("dotenv").config();

//connect mongoose woth mongoDB url
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// export mongoose so that models can interface with it
module.exports= {mongoose};
