import express from "express"
import request from "../request"
import {User} from "../../../database/schemas/user"

class login extends request {
    constructor(lib) {
        super();
        this.db = lib.db;
        this.post = {
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
        }
    }
}
export default login;