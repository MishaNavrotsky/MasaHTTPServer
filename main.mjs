import authentication from "./authentication"
import database from "./database"
import server from "./server"
import fs from "fs"

(async function () {
    var db = new database("mongodb://localhost:27017/local");
    // await db.init();
    var auth = new authentication(db);
    auth.init(fs.readFileSync("secret.txt"));
    var ser = new server(db, auth);
    ser.init();
})();