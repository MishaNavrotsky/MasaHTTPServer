import authentication from "./authentication"
import database from "./database"
import server from "./server"
import {User} from "./database/schemas/user"

(async function () {
    var db = new database("mongodb://localhost:27017/local");
    await db.init();
    db.saveUser(new User({username:"qwe",password:"ewq", xyu:"xyu"}));
    var auth = new authentication(db);
    auth.init();
    var ser = new server(db, auth);
    ser.init(1337);
})();