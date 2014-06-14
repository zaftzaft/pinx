(function(){
  var Ranking = {};

  var prev = {
    category: null,
    date:     null
  };

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

  // !/ranking/:category/date?
  Pinx.router.on(/!\/ranking\/([^\/]+)\/?(\d*)/, function(category, date){
    date = date || null;

    if(category === prev.category && date == prev.date){
      return Ranking.show();
    }

    Ranking.get({
      mode: category,
      date: date
    }, function(err, result){
      if(err){
        Pinx.ErrorVM.$data = err;
        Pinx.ErrorShow();
        return;
      }
      Ranking.vm.$data = result;

      Ranking.show();
    });

    prev.category = category;
    prev.date = date;
  });

})();
