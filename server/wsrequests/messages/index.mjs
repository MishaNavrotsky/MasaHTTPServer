import wsrequest from "../wsrequest"

class messages extends wsrequest {
    constructor(obj) {
        super();
        this.db = obj.db
        this.path = "messages"
        this.message.merge({
            function: (obj, ws) => {
                ws.send(JSON.stringify({
                    status: "ok",
                    data: "lolkek"
                }))
            }
        })
    }
}

export default messages;