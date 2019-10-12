import expressWebSocket from 'express-ws'
import messages from "./messages"

class wsrequests extends Array {
    constructor(obj) {
        super();
        this.push(new messages(obj));
    }

    init(express, defaultString) {
        expressWebSocket(express);
        express.ws(defaultString, (ws, req) => {
            ws.on("message", (message) => {
                let obj = {};
                try {
                    obj = JSON.parse(message);
                } catch (e) {

                }
                for (const webrequest of this) {
                    if (obj.path === webrequest.path) {
                        webrequest.message.function(obj, ws);
                        break;
                    }
                }
            })
        })
    }
}

export default wsrequests;