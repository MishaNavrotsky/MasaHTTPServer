import wsrequest from "../wsrequest"
import {
    Message
} from "../../../database/schemas/message"
import _ from "lodash"

class findMessages extends wsrequest {
    constructor(obj) {
        super();
        this.db = obj.db
        this.path = "findMessages"
        this.message.merge({
            function: (obj, ws, req, usersConnected) => {
                //obj : {path:"findMessages", to: "username", skip: Number }
                const {
                    to,
                    skip
                } = obj;
                const data = {};
                this.db.findMessages(req.user.username, to, skip).then(messages => {
                    data.to = messages;
                    return this.db.findMessages(to, req.user.username, skip)
                }).then(messages => {
                    data.from = messages;
                    ws.send(JSON.stringify({
                        status: "ok",
                        data
                    }))
                }).catch(e => ws.send(JSON.stringify({
                    status: "error",
                    message: e.message
                })))
            }
        })
    }
}

export default findMessages;