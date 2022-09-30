import mongoose from "mongoose"
import bcrypt from "bcrypt-nodejs"

const userSchema = new mongoose.Schema({
    username: String,
    password: String
}, { versionKey: false})

userSchema.methods.generateHash = (password) => {
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    return hash
}

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

export const User = mongoose.model("users", userSchema)