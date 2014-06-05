(function(root){
  var Exchanger = function($content){
    this.$content = $content;
    this.views = {};
    this.current = {
      name: null,
      option: null,
      url: null
    };
    this.position = {};
  };

  Exchanger.prototype = {
    set: function($el, options){
      var that = this;
      var name = options.name;

      this.views[name] = {
        $el: $el,
        useCache: options.useCache || true,
        show: options.show || null,
        hide: options.hide || null
      };

      // Show Element
      return function(){
        that.show(name);
      };
    },
    show: function(name){
      var url = location.hash;

      // Prev Elem
      var prev = this.views[this.current.name];
      if(prev){
        this.position[this.current.url] = this.$content.scrollTop();
        prev.hide && prev.hide();
      }

      // Hide #content > *
      this.$content.children().hide();

      var now = this.views[name];
      now.$el.show();
      now.show && now.show();


      this.$content.scrollTop(now.useCache && this.position[url] || 0);

      this.current = {
        name: name,
        url: url
      };

      return this;
    }
  };

  root.Exchanger = Exchanger;

})(this);
