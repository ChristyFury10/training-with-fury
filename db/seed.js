const mongoose = require("./connection");

const User = require("../models/user")
const bcrypt = require("bcryptjs");


// const seed = async () =>{
//     const newUser = {
//         username: "christy",
//         password: await bcrypt.hash("secret", await bcrypt.)
//     }
// }