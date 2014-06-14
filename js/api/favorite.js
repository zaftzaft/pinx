var fs = require("fs");
var uuid = require("node-uuid");
var paths = require("./paths.js");

var Favorite = {};

/*
 * id:  uuid
 * link: user/123456789
 * name: user_name
 * icon: profile_img
 */
var json = [];

Favorite.add = function(link, name, icon){
  if(/user\/\d+/.test(link) || !name || !icon){
    return false;
  }

  json.push({
    id:   uuid.v4(),
    link: link,
    name: name,
    icon: icon
  });

  this.save();
};

Favorite.remove = function(id){

  json.forEach(function(obj, i){
    if(obj.id === id){
      json.splice(i, 1);
    }
  });

  json.save();
};

Favorite.has = function(link){
  return json.some(function(o){
    return o.link === link;
  });
};

Favorite.get = function(){
  return json;
};

Favorite.save = function(){
  fs.wirteFile(
    paths.favorite,
    JSON.stringify(json)
  );
};

if(fs.exists(paths.favorite)){
  json = JSON.parse(fs.readFileSync(
    paths.favorite, "utf8"
  ));
}

module.exports = Favorite;
