var fs = require("fs");
var paths = require("./paths.js");

var json;

if(fs.existsSync(paths.config)){
  json = JSON.parse(fs.readFileSync(paths.config, "utf8"));
}
else{
  json = JSON.parse(fs.readFileSync("../../config.default.json", "utf8"));
}

module.exports = json;
