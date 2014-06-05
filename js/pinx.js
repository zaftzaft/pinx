(function(){
  var Pinx = {};

  Pinx.X = new Exchanger($("#content"));

  Pinx.router = Router();

  Pinx.Panel = Vue.extend({
    methods: {
      lazy: function(){
        var that = this;
        setTimeout(function(){
          $(that.el).css(
            "backgroundImage",
            "url(" + that.vm.$data.url +  ")"
          );
        }, this.vm.$index * 10);
      }
    }
  });

  return window.Pinx = Pinx;
})();

(function(){
  var moment = require("./js/lib/moment-with-langs.min.js");
  var _ = require("lodash");

  Vue.filter("notitle", function(value){
    return value || "**notitle**";
  });
  
  Vue.filter("jadate", function(value){
    return moment(value).lang("ja")
    .format("YYYY年MMMMDD日(ddd) HH時mm分ss秒");
  });

  Vue.partial("panel", $(".panel")[0]);

  Vue.directive("call", {
    isFn: true,
    update: function(handle){
      if(_.isFunction(handle)){
        handle.call(this, this.vm);
      }
    }
  });

})();
