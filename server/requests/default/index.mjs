import express from "express"
import request from "../request"

class def extends request {
    constructor() {
        super();
        this.get = {
            path: /.+/,
            function: function (req, res) {
                res.send({
                    status : "error",
                    message: "Not found"
                });
                res.end();
            }
        }
    }
}

export default def;