import expressWebSocket from 'express-ws'
import messages from "./messages"
import _ from "lodash"


class WSConnection extends Object {
    constructor(user, ws) {
        this.user = user;
        this.ws = ws;
    }
}
class wsrequests extends Array {
    constructor(obj) {
        super();
        this.push(new messages(obj));
        this.usersConnected = [];
    }

    init(express, defaultString) {
        const expressWS = expressWebSocket(express);
        const wss = expressWS.getWss();

        express.ws(defaultString, (ws, req) => {
            this.usersConnected.push({
                user: req.user,
                ws
            });
            ws.on("close", () => {
                _.remove(this.usersConnected, value => value.user.username === req.user.username);
            })
            ws.on("message", (message) => {
                let obj = {};
                try {
                    obj = JSON.parse(message);
                } catch (e) {

                }
                for (const webrequest of this) {
                    if (obj.path === webrequest.path) {
                        webrequest.message.function(obj, ws, req, this.usersConnected);
                        break;
                    }
                }
            })
        })
    }
}

export default wsrequests;