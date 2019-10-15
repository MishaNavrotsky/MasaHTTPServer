import express from 'express'
import requests from './requests'
import wsrequests from './wsrequests'
import cors from "cors"

import _ from "lodash"

class server {
    constructor(db = {}, auth = {}) {
        this.db = db;
        this.auth = auth;
        this.app = new express().use(cors({
            origin: (origin, cb)=>{
                return cb(null, true);
            },
            optionsSuccessStatus: 200,
            credentials: true
        }));
        this.requests = new requests({
            db: this.db,
            auth: this.auth
        });
        this.wsrequests = new wsrequests({
            db: this.db
        });
    }



    init(port) {
        //CORS
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        console.log("Server init!............");
        //check all requests for using auth 
        console.log("Server auth init........")
        let notAuthArr = [];
        for (const request of this.requests) {
            notAuthArr.push(request.notAuthPathes);
        }
        notAuthArr = _.flattenDeep(notAuthArr);
        this.app.use(this.auth.expressModule.unless({
            path: notAuthArr
        }));
        //auth error handler
        this.app.use(this.auth.errorHandler);
        //init ws routes
        console.log("WS init...........");
        this.wsrequests.init(this.app, "/websocket");

        //init express routes
        console.log("Requests init.........");
        this.requests.init(this.app);
        this.app.listen(port);
    }
}

export default server;