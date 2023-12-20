const express = require("express")
const router = express.Router()
const {getAllWorkouts, getSingleWorkout,
        createWorkout, deleteWorkout, updateWorkout,
        } = require("../controllers/workoutController")
const requireAuth = require("../middleware/requireAuth")

// require auth for all workout routes   
router.use(requireAuth)

// Get all workouts
router.get("/", getAllWorkouts)

// Get single workout
router.get("/:id", getSingleWorkout)

// Create workout
router.post("/", createWorkout)

// Delete single workout
router.delete("/:id", deleteWorkout)

// Update workout
router.patch("/:id", updateWorkout)

module.exports = router;