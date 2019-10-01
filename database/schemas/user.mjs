import mongoose from "mongoose"

const userScheme = mongoose.Schema({
    //TODO validator?
    username: {
        required: true,
        type: String,
        unique: true
    },
    //TODO validator?
    password: {
        required: true,
        type: String
    },
    //TODO validator?
    email: {
        type: String
    },
    //TODO validator?
    phone: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    lastActiveDate: {
        type: Date
    }
})

class UserClass {
    constructor() {
    }
}

userScheme.loadClass(UserClass);
const User = mongoose.model("User", userScheme);

export {
    User,
    userScheme
};