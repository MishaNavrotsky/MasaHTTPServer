import express from "express"
import request from "../request"

class login extends request {
    constructor(){
        super();
        this.post = {
            path: "/login",
            function: function (req, res) {
                res.send({
                    status: "ok",
                    token: "xz"
                });
                res.end();
            }
        }
    }
}
export default login;