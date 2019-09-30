import express from "express"


var login = {
    name:'login',
    post: {
        path: "/login",
        function: function (req, res) {
            res.send({
                status: "ok",
                token: "xz"
            });
            res.end();
        }
    }
}

export default login;