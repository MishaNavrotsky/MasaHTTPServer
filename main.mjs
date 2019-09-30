import authentication from "./authentication"
import database from "./database"
import server from "./server"

var db = new database();
var auth = new authentication(db);
var ser = new server(db, auth);
ser.init(1337);
