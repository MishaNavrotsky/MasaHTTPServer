import wsrequest from "../wsrequest"
import {
    Message
} from "../../../database/schemas/message"
import _ from "lodash"

class recieveMessages extends wsrequest {
    constructor(obj) {
        super();
        this.db = obj.db
        this.path = "receiveMessages"
        this.message.merge({
            function: (obj, ws, req, usersConnected) => {
                //obj : {path:"receiveMessages", argument: "unreceived" }
                if (obj.argument === "unreceived") {
                    this.db.findUnreceivedMessages(req.user.username).then(messages => {
                        ws.send(JSON.stringify({
                            status: "ok",
                            data: messages
                        }))
                        return this.db.setMessagesReceived(req.user.username);
                    }).catch(e => ws.send(JSON.stringify({
                        status: "error",
                        message: e.message
                    })))
                }
            }
        })
    }
}

export default recieveMessages;