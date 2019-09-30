import login from "./login"
import index from "./index/index"
import def from "./default"

var requests = [login, index];


requests.push(def);


export default requests;