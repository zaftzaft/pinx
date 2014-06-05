var path = require("path");
var request = require("request").defaults({ jar: false });
var login = require("./login.js");
var paths = require("./paths.js");

/*
 * Mode
 *  daily, weekly, monthly, rookie, original, male, female
 *  *_r18
 * Content
 *  illust, manga
 */
var get = function(options, callback){
  request({
    url: "http://www.pixiv.net/ranking.php",
    qs: {
      PHPSESSID: login.key(),
      format: "json",
      mode:    options.mode || "daily",
      content: options.content || null,
      date:    options.date || 0,
      p:       options.p || options.page || 1
    }
  }, function(err, resp, body){
    if(err){
      return callback(err);
    }
    if(!~resp.headers["content-type"].indexOf("json")){
      console.log("Auth Error");
      return callback("Auth Error");
    }
    callback(null, JSON.parse(body));
  });
};

module.exports = function(options, callback){
  // {mode}-{date}-{page}(-{content}).json
  //var filename = 
  //fs.exists(path.join(paths.ranking, ""));

  get(options, callback);
};
