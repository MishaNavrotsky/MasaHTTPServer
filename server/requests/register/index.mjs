import express from "express"
import request from "../request"
import {
    User
} from "../../../database/schemas/user"

class register extends request {
    constructor(lib) {
        super();
        this.db = lib.db;
        this.post = {
            path: "/register",
            function: (req, res) => {
                const user = new User(req.body);
                this.db.saveUser(user).then(result => {
                    res.send({
                        status: "ok",
                        token: "xz"
                    })
                    res.end();
                }).catch(err => {
                    res.send({
                        status: "error",
                        message: "user cannot be created"
                    })
                })
            }
        }
    }
}
export default register;