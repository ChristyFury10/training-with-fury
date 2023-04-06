const router = require("express").Router();
const authRouter = require("./auth")

//middleware
router.use("/auth", authRouter);


router.get("/", (req, res)=>{
    res.render("home")
});

router.get("/dashboard ", (req, res)=>{
    res.render("dashboard")
})

module.exports = router;