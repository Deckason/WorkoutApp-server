const express = require("express")
const router = express.Router()
const {loginUser, signupUser} = require("../controllers/userController")

// ---------------LOGIN ROUTE----------------//
router.post("/login", loginUser)

//----------------SIGNUP ROUTE---------------//
router.post("/sign-up", signupUser)

module.exports = router