import mongoose from "mongoose"
import {
    User
} from "./schemas/user"
import {
    Message
} from "./schemas/message"
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

    addMessage(message) {
        if (message.constructor.modelName !== "Message") {
            throw "addMessage object is not type of Message";
        }
        return message.save().catch(error => {
            console.log(error.message);
            throw error;
        });
    }

    findMessages(from, to, skip) {
        return Message.find({
            from,
            to
        }, "data received sendDate -_id", {
            sort: {
                sendDate: -1
            },
            limit:20,
            skip
        }).exec();
    }

    findUnreceivedMessages(username){
        return Message.find({
            to:username,
            received:false
        }, "data from sendDate -_id").exec();
    }
 
    setMessagesReceived(to){
        return Message.updateMany({to}, { received: true }).exec(); 
    }
}

export default database;