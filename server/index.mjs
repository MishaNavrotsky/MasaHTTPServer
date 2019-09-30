import express from 'express'
import requests from './requests'

class server {
    constructor(db = {}, auth = {}) {
        this.db = db;
        this.auth = auth;
        this.app = new express();
        this.app.use((req,res,next)=>{
            res.locals.db = this.db;
            res.locals.auth = this.auth;
            next();
        })
    }

    init(port) {
        console.log("Server init!............");
        console.log("ALL REQUESTS !!!!!!!!!!!!!!!!!!!!!!")
        for (const request of requests) {
            console.log(request);
            if (request.get) {
                this.app.get(request.get.path,request.get.function);
            } 
            if (requests.post) {
                this.app.post(request.post.path,request.post.function);
            }
        }
        console.log("ALL REQUESTS !!!!!!!!!!!!!!!!!!!!!!")
        this.app.listen(port);
    }
}

export default server;