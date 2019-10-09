import authentication from "./authentication"
import database from "./database"
import server from "./server"
import fs from "fs"

const PORT = process.env.PORT || 5000

var db = new database("mongodb://localhost:27017/local");
await db.init();
var auth = new authentication(db);
auth.init(fs.readFileSync("secret.txt"));
var ser = new server(db, auth);
ser.init(PORT);