var fs = require("fs");
var request = require("request").defaults({ jar: false });
var root = require("./root.js");
var paths = require("./paths.js");
var config = require("./config.js");

var Login = {};
// Get Sessid

Login.login = function(callback){
  request.post({
    url: "https://touch.secure.pixiv.net/login.php",
    form: {
      mode:     "login",
      pixiv_id: config.user.id,
      pass:     config.user.pw,
      skip:     0
    }
  }, function(err, resp, body){
    if(err){
      return callback(err);
    }
    if(resp.statusCode != 302){
      return callback(resp.statusCode + body);
    }
    callback && callback(
      null,
      resp.headers["set-cookie"].pop()
    );
  });
};

Login.get = function(callback){
  Login.login(function(err, sessid){
    if(err){
      return console.log("LOGIN FAILD");
      //throw err;
    }
    Login.sessid = sessid;
    fs.writeFile(paths.sessid, sessid);
    callback && callback(sessid);
  });
};

Login.key = function(){
  return this.sessid.match(/PHPSESSID=(\w+);/)[1];
};

Login.expires = function(){
  return this.sessid.match(/expires=([^;]+)/)[1];
};

Login.isExpires = function(){
  return +new Date > +new Date(this.expires());
};

var filename = paths.sessid;
Login.sessid = fs.existsSync(filename) ?
  fs.readFileSync(filename, "utf8") : "expires=0;";

if(Login.isExpires()){
  Login.get(function(id){
    console.log("login", id);
  });
}

module.exports = Login;
