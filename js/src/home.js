(function(){
  var vm = new Vue({
    el: "#home",
    data: {
      categories: [
        "daily", "weekly", "monthly",
        "rookie", "original",
        "male", //"female",
        "daily_r18", "weekly_r18",
        "male_r18", //"female_r18",
      ]
    }
  });

  var show = Pinx.X.set($(vm.$el), {
    name: "home"
  });

  Pinx.router.on("!/home", function(){
    show();
  });

})();
