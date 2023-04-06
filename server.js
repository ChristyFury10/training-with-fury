require('dotenv').config();
const express = require("express");
const app = express();
const {mongoose} = require("mongoose");
const methodOverride = require("method-override");
const { PORT, DATABASE_URL } = require("./config.js");

////////////MIDDLEWARE//////////////////////
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

////////////////Routes/////////////////////




mongoose.connect(DATABASE_URL).then(
    ()=>{
        app.listen(PORT, ()=> console.log(`Connected to mongoDB and express is listening on port ${PORT}`))
    }
)