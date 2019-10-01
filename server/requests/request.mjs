class request {
    super(){
        this.get = {};
        this.post = {};
    }

    toObject(){
        var obj = {get:this.get, post:this.post}
        return obj;
    }
}

export default request;