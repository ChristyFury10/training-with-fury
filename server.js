const express = require("express");
const app = express();
const {mongoose} = require("mongoose");
const methodOverride = require("method-override");
const { PORT, DATABASE_URL } = require("./config.js");
const exercisesRouter = require("./routers/exercisesRouter.js")

////////////MIDDLEWARE//////////////////////
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));


////////////////Routes/////////////////////

app.use("/exercises", exercisesRouter);
// app.use("/users", usersRouter);


mongoose.connect(DATABASE_URL).then(
    ()=>{
        app.listen(PORT, ()=> console.log(`Connected to mongoDB and express is listening on port ${PORT}`))
    }
)