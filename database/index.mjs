import mongoose from "mongoose"
import {
    User
} from "./schemas/user"

class database {
    constructor(connectionString) {
        console.log("Database init!............");
        this.connectionString = connectionString;

    }

    async init() {
        console.log("Connecting to DB on " + this.connectionString + ".....");
        try {
            this.db = await mongoose.connect(this.connectionString, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
        } catch (e) {
            throw "DB ERROR: " + e.message;
        }
        console.log("DB connected.");
    }

    saveUser(user) {
        if (user.constructor.modelName !== "User") {
            throw "createUser object is not type of User";
        }
        return user.save().catch(error => {
            console.log(error.message);
            throw error;
        });
    }


    checkUser(user) {
        return User.findOne({
            username: user.username,
            password: user.password
        });
    }
}

export default database;