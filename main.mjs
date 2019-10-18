import authentication from "./authentication"
import database from "./database"
import server from "./server"
import fs from "fs"

const PORT = process.env.PORT || 5000
const MONGODBSTRING = "mongodb://juju577:noV123ch@ds233198.mlab.com:33198/heroku_83f1b22l"

console.log(new Date());
const db = new database(MONGODBSTRING);
db.init().then(() => {
    const auth = new authentication(db);
    auth.init(fs.readFileSync("secret.txt"));
    const ser = new server(db, auth);
    ser.init(PORT);

    // async function aaas(params) {
    //     for (var i = 0; i < 200; i++) {
    //         var m = new Message({
    //             from: "juju577",
    //             to: "juju578",
    //             data: "lol kek " + i
    //         });
    //         await db.addMessage(m);
    //     } 
    //     console.log("ready");
    // }
    // aaas();
    // db.findMessages("juju577","juju578",100).then(a=>console.log(a));
});