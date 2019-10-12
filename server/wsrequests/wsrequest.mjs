import _ from "lodash"

class method extends Object {
    constructor() {
        super();
    }

    merge(obj) {
        _.merge(this, obj);
    }
}

class wsrequest {
    constructor() {
        Object.defineProperty(this, "message", {
            value: new method(),
            writable: false,
            enumerable: true,
            configurable: true
        });
        this.function = () => {};
        this.path = "";
    }

    // toObject() {
    //     var obj = {
    //         get: this.get,
    //         post: this.post
    //     }
    //     return obj;
    // }
}

export default wsrequest;