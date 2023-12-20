const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require("validator")
 

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.statics.signUp = async function(username, email, password, confirmPassword) {
    if (!username || !email || !password || !confirmPassword) {
        throw Error("All Fields must be filled")
    }
    if (password !== confirmPassword) {
        throw Error("Passwords do not match")
    }
    if (!validator.isEmail(email)) {
        throw Error("Use a valid email format")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
    }
    const emailExist = await this.findOne({email})
    if(emailExist) {
        throw Error("Email exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = this.create({username, email, password: hashedPassword})
    return user
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All Fields must be filled")
    }

    const user = await this.findOne({email})
    if (!user) {
        throw Error("Wrong email")
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw Error("Wrong password")
    }

    return user
}

module.exports = mongoose.model("User", userSchema)