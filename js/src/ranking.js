(function(){
  var Ranking = {};

  var prev = null;

  Ranking.get = require("./js/api/ranking.js");

  Ranking.vm = new Pinx.Panel({
    el: "#ranking",
    methods: {
      getNext: function(){
        var vm = this;
        Ranking.get({
          mode: prev,
          p: vm.$data.next
        }, function(err, res){
          res.contents.forEach(function(o){
            vm.contents.push(o);
          });
          vm.$data.next = res.next;
        });
      }
    }
  });

  Ranking.show = Pinx.X.set($(Ranking.vm.$el), {
    name: "ranking"
  });

  Pinx.router.on("!/ranking/:category", function(category){
    if(category === prev){
      Ranking.show();
    }
    else{
      Ranking.get({
        mode: category
      }, function(err, result){
        if(err){
          throw err;
        }
        Ranking.vm.$data = result;

        Ranking.show();
      });
    }
    prev = category;
  });


})();
