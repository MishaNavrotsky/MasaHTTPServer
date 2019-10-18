import wsrequest from "../wsrequest"
import {
    Message
} from "../../../database/schemas/message"
import _ from "lodash"

class messages extends wsrequest {
    constructor(obj) {
        super();
        this.db = obj.db
        this.path = "sendMessage"
        this.message.merge({
            function: (obj, ws, req, usersConnected) => {
                let {
                    to,
                    data
                } = obj;
                const msg = new Message({
                    from: req.user.username,
                    to,
                    data
                });
                this.db.addMessage(msg).then((smsg) => {
                    ws.send(JSON.stringify({
                        status: "ok",
                    }));
                    const sendTo = _.findLast(usersConnected, value => value.user.username === msg.to);
                    if (sendTo) {
                        sendTo.ws.send(
                            JSON.stringify({
                                status: "ok",
                                path: "recieveMessage",
                                from: req.user.username,
                                data: msg.data
                            })
                        );
                        smsg.received = true;
                        smsg.save();
                    }
                }).catch(e => {
                    ws.send(JSON.stringify({
                        status: "error",
                        message: e.message
                    }))
                });
            }
        })
    }
}

export default messages;