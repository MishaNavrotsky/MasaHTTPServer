import express from "express"
import request from "../request"

class def extends request {
    constructor() {
        super();
        this.get.merge({
            path: /.+/,
            function: (req, res) => {
                res.status(404).send({
                    status: "error",
                    message: "Not found"
                });
                res.end();
            }
        });
    }
}

export default def;