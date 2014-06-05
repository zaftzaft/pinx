var request = require("request").defaults({ jar: false });
var login = require("./login.js");
var root = require("./root.js");
var parse = require("./parse.js");

module.exports = function(options, callback){
  request({
    url: root + "/search.php",
    qs: {
      PHPSESSID: login.key(),
      s_mode:    "s_tag",
      p:         options.p || options.page || 1,
      word:      options.word
    }
  }, function(err, resp, body){
    if(err){
      return callback(err);
    }
    callback(null, parse.illust(body));
  });
};
