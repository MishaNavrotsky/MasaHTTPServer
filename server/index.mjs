import express from 'express'
import requests from './requests'
import _ from "lodash"

class server {
    constructor(db = {}, auth = {}) {
        this.db = db;
        this.auth = auth;
        this.app = new express();
        this.requests = new requests({
            db: this.db,
            auth: this.auth
        });
    }

    init(port) {
        console.log("Server init!............");
        console.log("ALL REQUESTS !!!!!!!!!!!!!!!!!!!!!!")
        for (const request of this.requests) {
            console.log(request);
            if (!_.isEmpty(request.get)) {
                this.app.get(request.get.path, request.get.function);
            }
            if (!_.isEmpty(request.post)) {
                this.app.post(request.post.path, request.post.function);
            }
        }
        console.log("ALL REQUESTS !!!!!!!!!!!!!!!!!!!!!!")
        this.app.listen(port);
    }
}

export default server;