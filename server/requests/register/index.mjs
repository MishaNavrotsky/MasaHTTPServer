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
        this.auth = false;
        this.post.merge({
            auth: false,
            middleware: bodyParser.json(),
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
                    let messages = [];
                    for(const i in err.errors) {
                        if(err.errors[i].name==="ValidatorError"){
                            messages.push(err.errors[i].message);
                        }
                    }
                    res.send({
                        status: "error",
                        message: "validation error",
                        messages: messages
                    })
                })
            }
        })
    }
}
export default register;