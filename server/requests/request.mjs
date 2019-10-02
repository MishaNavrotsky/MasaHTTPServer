import _ from "lodash"

class method extends Object {
    constructor() {
        super();
    }

    merge(obj) {
        _.merge(this, obj);
    }

    //TODO redo
    get changed() {
        if (Object.keys(this).length === 1 && !_.isUndefined(this.auth)) return false;
        return true;
    }
}

class request {
    constructor() {
        Object.defineProperty(this, "get", {
            value: new method(),
            writable: false,
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this, "post", {
            value: new method(),
            writable: false,
            enumerable: true,
            configurable: true
        });
        this.get.auth = true;
        this.post.auth = true;
    }
    get notAuthPathes() {
        const arr = [];
        if (!this.get.auth && this.get.path) {
            arr.push({url:this.get.path, methods:["GET"]});
        }

        if (!this.post.auth && this.post.path) {
            arr.push({url:this.post.path, methods:["POST"]});
        }

        return arr;
    }
    get pathes() {
        const arr = [];
        if (this.get.path) {
            arr.push(this.get.path);
        }

        if (this.post.path) {
            arr.push(this.post.path);
        }
        return arr;

    }

    toObject() {
        var obj = {
            get: this.get,
            post: this.post
        }
        return obj;
    }
}

export default request;