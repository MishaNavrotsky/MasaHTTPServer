import authentication from "./authentication"
import database from "./database"
import server from "./server"
import fs from "fs"

const PORT = process.env.PORT || 5000

(async function () {
    console.log(123);
    var db = new database("mongodb://localhost:27017/local");
    // await db.init();
    console.log(123);

    var auth = new authentication(db);
    console.log(123);

    auth.init(fs.readFileSync("secret.txt"));
    console.log(123);

    var ser = new server(db, auth);
    console.log(123);

    ser.init(PORT);
    console.log(123);

})();

setInterval(()=>console.log(123),1000);