import express from "express"

var def = {
    name: "def",
    get: {
        path: /.+/,
        function: function (req, res) {
            res.send({
                "Error": "Not found"
            });
            res.end();
        }
    }
}

export default def;