import mongoose from "mongoose"

const userScheme = mongoose.Schema({
    //TODO validator?
    username: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-z0-9_]{3,16}$/.test(v)
            },
            message: "username is not valid"
        }
    },
    //TODO validator?
    password: {
        required: true,
        type: String,
        validate: {
            validator: function (v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/.test(v)
            },
            message: "password is not valid"
        }
    },
    //TODO validator?
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(v)
            },
            message: "email is not valid"
        }
    },
    //TODO validator?
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[0-9]{10,16}$/.test(v)
            },
            message: "phone number is not valid"
        }
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    lastActiveDate: {
        type: Date
    }
})

class UserClass {
    constructor() {}
}

userScheme.loadClass(UserClass);
const User = mongoose.model("User", userScheme);

export {
    User,
    userScheme
};