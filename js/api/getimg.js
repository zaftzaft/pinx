var request = require("request");
var fs = require("fs");
var path = require("path");
var login = require("./login.js");
var paths = require("./paths.js");

module.exports = function(url, callback){
  var s = url.split("/");
  var file = s.pop();
  var uid = s.pop();
  var filename = path.join(paths.tmp, uid + "-" + file);

  if(!fs.existsSync(filename)){
    var writer = fs.createWriteStream(filename);
    request({
      url: url,
      headers: {
        Cookie:  login.sessid,
        referer: "http://pixiv.net/"
      }
    }).pipe(writer);
    writer.on("finish", function(){
      callback(filename);
    });
  }
  else{
    callback(filename);
  }
};
