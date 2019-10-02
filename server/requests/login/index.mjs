import express from "express"
import request from "../request"
import bodyParser from 'body-parser'
import {User} from "../../../database/schemas/user"

class login extends request {
    constructor(lib) {
        super();
        this.db = lib.db;
        this.post.merge({
            auth:false,
            middleware: bodyParser.json(),
            path: "/login",
            function: (req, res) => {
                const user = new User(req.body);
                this.db.checkUser(user).then(result => {
                    if (result) {
                        res.send({
                            status: "ok",
                            token: "xz"
                        })
                    } else {
                        res.send({
                            status: "error",
                            message: "user not found"
                        })
                    }
                    res.end();
                })
            }
        })
    }
}
export default login;