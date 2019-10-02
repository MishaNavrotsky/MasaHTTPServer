import express from "express"
import request from "../request"

class index extends request {
    constructor() {
        super();
        this.get.merge({
            auth: false,
            path: "/",
            function:  (req, res) => {
                res.send("AMMA INDEX");
                res.end();
            }
        });
    }
}

export default index;