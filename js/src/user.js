(function(){
  var _ = require("lodash");

  var User = {};

  var Favorite = require("./js/api/favorite.js");
  User.get = require("./js/api/user.js");

  User.vm = new Pinx.Panel({
    el: "#user",
    methods: {
      getNext: function(){
        var vm = this;
        User.get.illust({
          id: User.currentId,
          p: vm.$data.next
        }, function(err, res){
          res.forEach(function(o){
            vm.images.push(o);
          });
          if(res.length){
            vm.$data.next++;
          }
          else{
            vm.$data.next = null;
          }
        });
      }
    }
  });
  User.show = Pinx.X.set($(User.vm.$el), {
    name: "user"
  });

  Pinx.router.on("!/user/:id", function(id){
    User.currentId = id;
    User.get.profile(id, function(err, result){
      var json = _.cloneDeep(JSON.parse(result).body);

      json.profile_img = json.profile_img.replace(
        /\/(\w+)(\.\w+)$/, "/mobile/$1_160.jpg"
      );

      User.vm.$data = json;
      User.vm.$set("next", 2);
      User.show();
    });

    User.get.illust({
      id: id
    }, function(err, result){
      User.vm.$set("images", result);
    });
  });

})();
