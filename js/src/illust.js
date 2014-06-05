(function(){
  var async = require("async");

  var getimg = require("./js/api/getimg.js");
  var download = require("./js/api/download.js");

  var Illust = {};

  Illust.get = require("./js/api/illust.js");

  Illust.vm = new Vue({
    el: "#illust",
    methods: {
      genUrls: function(){
        var x = this.url.match(/http:\/\/i(\d)/)[1];
        var s = (this.server.length === 1 ? "0" : "") + this.server;
        var u = this.userUID;
        var id = this.id || this.illust_id;
        var t = this.type;

        var that = this;

        var i = 0, l = +this.images;
        var urls = [];
        var orgUrls = [];

        do{(function(i){

          orgUrls[i] = [
            "http://",
            "i" + x + ".pixiv.net",
            "/img" + s + "/img/" + u,
            "/" + id + ( l ? ("_p" + i) : "") + "." + t
          ].join("");

          getimg(
            orgUrls[i],
            function(path){
              urls[i] = "file://" + path;
              that.$set("urls", urls);
            }
          );
        }(i))}while(++i < l);

        this.$set("urls", urls);
        this.$set("orgUrls", orgUrls);
      },
      download: function(){
        var that = this;
        $(this.el).one("click", function(){
          var $el = $(this);
          var tasks = that.vm.orgUrls.map(function(url){
            return function(next){
              download(url, next);
            };
          });
          async.parallel(tasks, function(err){
            if(err){
              throw err;
            }
            that.vm.$set("downloaded", true);
          });
        });
      },
      zoom: function(){
        $(this.el).click(function(){
          var $el = $(this);
          var z = $el.css("zoom") * 100 | 0;
          if(z > 20){
            z -= 20;
          }
          else{
            z = 100;
          }
          $el.css("zoom", z / 100);
        });
      }
    }
  });

  Illust.show = Pinx.X.set($(Illust.vm.$el), {
    useCache: false,
    name: "illust"
  });

  Pinx.router.on("!/illust/:id", function(id){
    Illust.get(id, function(err, result){
      if(err){
        throw err;
      }

      Illust.vm.$data = result;
      Illust.vm.genUrls();
      Illust.show();
    });
  });

})();
