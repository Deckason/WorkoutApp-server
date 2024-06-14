const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const bodyParser = require('body-parser');
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")
const cors = require('cors');
// Express App
const app = express()

// Middleware
// app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/workouts", workoutRoutes)
app.use("/users", userRoutes)

// Connect to database
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
app.listen(process.env.PORT_NUMBER, {useNewUrlParser: true},()=>{
    console.log("Server listening  to port "+process.env.PORT_NUMBER)
    app.get("/", (req, res)=>{
        res.json({message: `Server running on port ${process.env.PORT_NUMBER}`})
    })
})
})
.catch(err=>console.log(err))


