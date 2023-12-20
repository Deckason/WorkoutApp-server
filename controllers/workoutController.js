const Workout = require("../models/workoutModels")
const mongoose = require("mongoose")

// Get all workouts
const getAllWorkouts = async (req, res)=>{
    try {
        const user_id = req.user.id
        const workouts = await Workout.find({user_id}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Get single workout
const getSingleWorkout = async (req, res)=>{
    const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid) {
            return res.status(404).json({msg: "Wrong Id format"})
        }
        const workout = await Workout.findById(id)
        if (!workout) {
            return res.status(404).json({msg: "Not found"})
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Create workout
const createWorkout = async (req, res)=>{
    const {title, reps, load} = req.body
    const user_id = req.user.id
    try{
        const workout = await Workout.create({title, reps, load, user_id})
        res.status(200).send(workout)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

// Delete workout
const deleteWorkout = async (req, res)=>{
    const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid) {
            return res.status(404).json({msg: "Wrong Id format"})
        }

        const workout = await Workout.findByIdAndDelete(id)

        if (!workout) {
            return res.status(404).json({msg: "Not found"})
        }
        res.status(200).json({msg: "Workout deleted Successfully!!!"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Update workout
const updateWorkout = async (req, res)=>{
    const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid) {
            return res.status(404).json({msg: "Wrong Id format"})
        }
        const workout = await Workout.findByIdAndUpdate(id, {...req.body}, {new: true})
        if (!workout) {
            return res.status(404).json({msg: "Not found"})
        }
        res.status(200).json(workout)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}