(function(){
  var User = {};

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
      var $elm = $($.parseHTML(result));
      $el = $elm;
      var $t = $elm.filter("table").eq(0).find("td");
      User.vm.$data = {
        icon:        $elm.find("img").attr("src"),
        name:        $t.eq(0).text(),
        homepage:    $t.eq(1).text(),
        gender:      $t.eq(2).text(),
        place:       $t.eq(3).text(),
        age:         $t.eq(4).text(),
        birthday:    $t.eq(5).text(),
        job:         $t.eq(6).text(),
        description: $t.eq(7).html(),
        next:        2
      };
      User.show();
    });

    User.get.illust({
      id: id
    }, function(err, result){
      User.vm.$set("images", result);
    });
  });

})();
