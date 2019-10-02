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
        //check all requests for using auth jwt
        let notAuthArr = [];
        for (const request of this.requests) {
            notAuthArr.push(request.notAuthPathes);
        }
        notAuthArr = _.flattenDeep(notAuthArr);
        this.app.use(this.auth.jwt.unless({
            path: notAuthArr
        }).catch());
        //init express routes
        for (const request of this.requests) {
            const disp = {
                ...request
            }
            console.log(`${request.constructor.name}: { ${disp.get ? "get: " + disp.get.path + " " : ""}${disp.post ? "post: " + disp.post.path : ""} }`);
            if (request.get.changed) {
                if (!_.isEmpty(request.get.middleware) || _.isFunction(request.get.middleware))
                    this.app.get(request.get.path, request.get.middleware, request.get.function);
                else
                    this.app.get(request.get.path, request.get.function);
            }
            if (request.post.changed) {
                if (!_.isEmpty(request.post.middleware) || _.isFunction(request.post.middleware))
                    this.app.post(request.post.path, request.post.middleware, request.post.function);
                else
                    this.app.post(request.post.path, request.post.function);
            }
        }
        this.app.listen(port);
    }
}

export default server;