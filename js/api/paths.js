var path = require("path");

function expand(p){
  return p.replace(/^~/, process.env.HOME);
}

var baseDir = expand("~/.pinx/");

module.exports = {
  base:    baseDir,
  baseDir: baseDir,
  cache:   path.join(baseDir, "cache"),
  ranking: path.join(baseDir, "cache/ranking"),
  theme:   path.join(baseDir, "theme"),
  tmp:     path.join(baseDir, "tmp"),
  config:  path.join(baseDir, "config.json"),
  sessid:  path.join(baseDir, "sessid.txt"),
  favorite: path.join(baseDir, "favorite.json")
};
