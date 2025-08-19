import {model, Schema} from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    avatar: {type: String},
})

const User = model('User', userSchema)

export default User
