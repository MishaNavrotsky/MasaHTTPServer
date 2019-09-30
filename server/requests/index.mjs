import login from "./login"
import index from "./index/index"
import def from "./default"

class requests extends Array {
    constructor(obj){
        super();
        this.push(new login(obj),new index(obj));
        this.push(new def(obj));
    }
}

export default requests;