import express from "express"
import request from "../request"
import bodyParser from 'body-parser'
import {User} from "../../../database/schemas/user"

class login extends request {
    constructor(lib) {
        super();
        this.db = lib.db;
        this.auth = lib.auth;
        this.post.merge({
            auth:false,
            middleware: bodyParser.json(),
            path: "/login",
            function: (req, res) => {
                const user = new User(req.body);
                this.db.checkUser(user).then(result => {
                    const token = this.auth.generateToken({
                        username: user.username,
                        password: user.password
                    });
                    if (result) {
                        res.cookie('token', token, {httpOnly:true}).send({
                            status: "ok",
                            // token: token
                        })
                    } else {
                        res.status(401).send({
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