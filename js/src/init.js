(function(){
  var fs = require("fs");
  var paths = require("./js/api/paths.js");

  var dirs = [
    paths.base,
    paths.cache,
    paths.ranking,
    paths.theme,
    paths.tmp
  ];

  // make directories
  dirs.forEach(function(dir){
    if(!fs.existsSync(dir)){
      console.log("create", dir, "directory");
      fs.mkdirSync(dir);
    }
  });

  // Create config.json
  if(!fs.existsSync(paths.config)){
    console.log("create config.json");
    fs.writeFileSync(
      paths.config,
      fs.readFileSync("./config.default.json", "utf8"),
      "utf8"
    );
  }

})();
