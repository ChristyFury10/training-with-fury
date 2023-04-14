//import router
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs")

// signup route {(/auth/signup)}
router.get("/signup", (req, res)=>{
    res.render("auth/signup")
});

// post route to create the user from the signup page
router.post("/signup", async (req, res)=>{
    try{
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        // create user
        await User.create(req.body)
        // redirect to login page
        res.redirect("/auth/login")
    }
    catch(error){
        res.status(400).json(error)
    }
   

});


// login route (/auth/login)
router.get("/login", (req, res)=>{
    res.render("auth/login")
});


router.post("/login", async (req, res)=>{
    
    try{
    // check if user exists already
    const user = await User.findOne({username: req.body.username});
    console.log(user)
    if (user){
        const result = await bcrypt.compare(req.body.password, user.password);
        console.log(result)
        if (result){ // if compared passwords match...
            req.session.user = {
                username: user.username,
                id: user._id
            };
            console.log("matched")
            
        }
        else{res.status(400).json({error: "password does not match"})}
    }
    else{
        res.status(400).json({error: "user does not exist"})
    }
    }
    catch(error){
        res.status(400).json({error: "unable to log in"})
    }

});

router.get("/logout", (req, res)=>{
    req.session.user = null;
    res.redirect("/login")
});



module.exports = router;