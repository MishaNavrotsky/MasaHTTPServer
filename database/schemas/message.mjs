import mongoose from "mongoose"

const messageScheme = mongoose.Schema({
    //TODO validator?
    from: {
        required: true,
        type: String
    },
    to: {
        required: true,
        type: String
    },
    data: {
        required: true,
        type: String,
    },
    received: {
        type: Boolean,
        default: false,
    },
    sendDate: {
        type: Date,
        default: Date.now
    }
})

class MessageClass {
    constructor() {}
}

messageScheme.loadClass(MessageClass);
const Message = mongoose.model("Message", messageScheme);

export {
    Message,
    messageScheme
};