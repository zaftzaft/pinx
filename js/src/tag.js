(function(){
  var Tag = {};

  Tag.get = require("./js/api/tag.js");

  Tag.vm = new Pinx.Panel({
    el: "#tag"
  });

  Tag.show = Pinx.X.set($(Tag.vm.$el), {
    name: "tag"
  });

  Pinx.router.on(/!\/tag\/(.+)/, function(word){
    Tag.get({
      word: word
    }, function(err, res){
      if(err){
        throw err;
      }
      Tag.vm.$data = {
        next: null,
        word: word,
        contents: res,
        r18: 1
      };
      Tag.show();
    })
  });

})();
