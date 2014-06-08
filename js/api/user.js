var request = require("request").defaults({ jar: false });
//var _ = require("lodash");
var login = require("./login.js");
var parse = require("./parse.js");
var root = require("./root.js");

// Namespace
var User = {};

// Profile
User.profile = function(id, callback){
  request({
    //url: root + "/profile.php",
    url: "http://www.pixiv.net/rpc/get_profile.php",
    qs: {
      //id: id
      user_id:   id,
      PHPSESSID: login.key()
    }
  }, function(err, resp, body){
    callback && callback(err, body);
  });
};

// Illust
User.illust = function(options, callback){
  request({
    url: root + "/member_illust.php",
    qs: {
      id: options.id,
      p:  options.p || options.page || 1,
      PHPSESSID: login.key()
    }
  }, function(err, resp, body){
    if(err){
      return callback(err);
    }
    callback(null, parse.illust(body));
  });
};

// Bookmark
User.bookmark = function(options, callback){
  request({
    url: root + "/bookmark.php",
    qs: {
      id: options.id,
      p:  options.p || options.page || 1,
      PHPSESSID: login.key()
    }
  }, function(err, resp, body){
    if(err){
      return callback(err);
    }
    callback(null, parse.illust(body));
  });
};

// Bookmark Users
User.bookmarkUsers = function(options, callback){
  request({
    url: root + "/bookmark_user_all.php",
    qs: {
      id: options.id,
      p:  options.p || options.page || 1,
      PHPSESSID: login.key()
    }
  }, function(err, resp, body){
    if(err){
      return callback(err);
    }
    callback(null, parse.user(body));
  });
};

// My Pixiv
User.myPixiv = function(options, callback){
  request({
    url: root + "/mypixiv_all.php",
    qs: {
      id: options.id,
      p:  options.p || options.page || 1,
      PHPSESSID: login.key()
    }
  }, function(err, resp, body){
    if(err){
      return callback(err);
    }
    callback(null, parse.user(body));
  });
};

module.exports = User;
