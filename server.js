require("dotenv").config();
const express = require("express");
const app = express();
const {mongoose} = require("mongoose");
const methodOverride = require("method-override");
const { PORT, DATABASE_URL } = require("./config.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const exercisesRouter = require("./routers/exercisesRouter.js")
const workoutsRouter = require("./routers/workoutsRouter.js")


////////////MIDDLEWARE//////////////////////
app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(
    session({
        store: MongoStore.create({ 
            mongoUrl: process.env.DATABASE_URL
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 
        }
    }),
)

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));


////////////////Routes/////////////////////

app.use("/exercises", exercisesRouter);
app.use("/workouts", workoutsRouter);
// app.use("/users", usersRouter);

app.get("/", (req, res)=>{
    let loggedIn;
    if (req.session.currentUser){
        loggedIn = true;
        user = req.session.currentUser;
    }
    res.render("home.ejs", {loggedIn, user})
})


app.listen(PORT, ()=> console.log(`Connected to mongoDB and express is listening on port ${PORT}`))