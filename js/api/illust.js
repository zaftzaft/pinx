var request = require("request").defaults({ jar: false });
var login = require("./login.js");
var parse = require("./parse.js");
var root = require("./root.js");

module.exports = function(id, callback){
  request({
    url: root + "/illust.php",
    qs: {
      illust_id: id,
      PHPSESSID: login.key()
    }
  }, function(err, resp, body){
    if(err){
      return callback(err);
    }
    callback(null, parse.illust(body)[0]);
  });
};
