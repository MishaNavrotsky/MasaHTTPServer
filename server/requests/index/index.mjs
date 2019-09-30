import express from "express"

var index = {
    name:"index",
    get: {
        path: "/",
        function: function (req, res) {
            res.send("AMMA INDEX");
            res.end();
        }
    }
}

export default index;