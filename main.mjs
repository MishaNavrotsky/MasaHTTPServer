import authentication from "./authentication/index.mjs"
import database from "./database/index.mjs"
import server from "./server/index.mjs"

var auth = new authentication();
var db = new database();
var ser = new server();

