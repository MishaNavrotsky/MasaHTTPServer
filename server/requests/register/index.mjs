import express from "express"
import request from "../request"
import bodyParser from 'body-parser'
import {
    User
} from "../../../database/schemas/user"

class register extends request {
    constructor(lib) {
        super();
        this.db = lib.db;
        this.auth = lib.auth;
        this.post.merge({
            auth: false,
            middleware: bodyParser.json(),
            path: "/register",
            function: (req, res) => {
                const user = new User(req.body);
                this.db.saveUser(user).then(result => {
                    const token = this.auth.generateToken({
                        username: user.username,
                        password: user.password
                    });
                    res.cookie('token', token, {httpOnly:true}).send({
                        status: "ok"
                    })
                    res.end();
                }).catch(err => {
                    let messages = [];
                    for (const i in err.errors) {
                        if (err.errors[i].name === "ValidatorError") {
                            messages.push(err.errors[i].message);
                        }
                    }
                    res.send({
                        status: "error",
                        message: "validation error",
                        messages: messages
                    })
                    res.end();
                })
            }
        })
    }
}
export default register;