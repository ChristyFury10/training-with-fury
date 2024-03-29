//import router
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs")

// signup route {(/auth/signup)}
router.get("/signup", (req, res)=>{
    let loggedIn = false;
    let takenUsername;
    res.render("auth/signup", {loggedIn, takenUsername})
});

// post route to create the user from the signup page
router.post("/signup", async (req, res)=>{
    // if(username exists... username exisrs... retry)
    try{
        
        let takenUsername;
        let userExists = await User.exists({username: req.body.username});
        if (userExists){
            let loggedIn;
            takenUsername = true;
           console.log(userExists);
           res.render("auth/signup", {takenUsername, loggedIn})
        }
        else{
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        // create user
        await User.create(req.body);
        console.log(req.body)
        // redirect to login page
        res.redirect("/exercises/auth/login")
        }
    }
    catch(error){
        res.status(400).json("could not sign up");
    }
   

});


// login route (/auth/login)
router.get("/login", (req, res)=>{
    let loggedIn = false;
    let incorrectInfo;
    if(req.session.currentUser){
        let loggedIn = true;
    console.log(req.session.currentUser)
    }
    res.render("auth/login", {loggedIn, incorrectInfo})
});


router.post("/login", async (req, res)=>{
    
    try{
    // check if user exists already
    const user = await User.findOne({username: req.body.username});
    console.log(user)
    let incorrectInfo;
    if (user){
        const result = await bcrypt.compare(req.body.password, user.password);
        console.log(result)
        if (result){ // if compared passwords match...
            req.session.currentUser = {
                username: user.username,
                id: user._id
            };
            console.log("matched");
            console.log("username:", req.session.currentUser.username)
            res.redirect("/exercises")
            
        }
        // else{res.status(400).json({error: "password does not match"})}
    }
    // else{
    //     res.status(400).json({error: "user does not exist"})
    // }
    else{
        let loggedIn;
        let incorrectInfo = true;
        res.render("auth/login", {incorrectInfo, loggedIn})
    }
    }
    catch(error){
        
        res.status(400).json({error: "unable to log in"});
      
    }

});

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/exercises/auth/login');
      })
    
})


module.exports = router;