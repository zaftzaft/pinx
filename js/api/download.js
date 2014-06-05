var fs = require("fs");
var path = require("path");
var getimg = require("./getimg.js");
var config = require("./config.js");

function expand(p){
  return p.replace(/^~/, process.env.HOME);
}

var downloadDir = expand(config.downloadDir || "~/Downloads");

module.exports = function(url, callback){
  getimg(url, function(filename){
    var name = filename.split("/").pop();
    fs.createReadStream(filename)
    .pipe(fs.createWriteStream(path.join(downloadDir, name))
      .on("finish", function(){
        callback(null, "finish");
      })
    );
  });
};
