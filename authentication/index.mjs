import jwt from "express-jwt"

class authetication {
    constructor(){
        console.log("Authetication init!............");
    }

    init(secret){
        this.jwt = jwt({secret:secret});
    }
}

export default authetication;