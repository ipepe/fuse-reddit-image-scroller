// Generated by CoffeeScript 1.10.0
(function() {
  var App, Observable,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Observable = require('FuseJS/Observable');

  App = (function() {
    App.prototype.items = Observable();

    App.prototype.reddit_url = 'https://www.reddit.com/r/AdviceAnimals.json';

    App.prototype.isLoading = Observable(false);

    function App() {
      this.reloadHandler = bind(this.reloadHandler, this);
      this.endLoading = bind(this.endLoading, this);
      console.log('App building...', new Date().toString());
      this.getRedditPosts();
    }

    App.prototype.endLoading = function() {
      return this.isLoading.value = false;
    };

    App.prototype.reloadHandler = function() {
      this.isLoading.value = true;
      return this.getRedditPosts();
    };

    App.prototype.onPostClicked = function() {
      return console.log('testTest!');
    };

    App.prototype.getRedditPosts = function() {
      return fetch(this.reddit_url).then(function(response) {
        return response.json();
      }).then((function(_this) {
        return function(responseObject) {
          var ref, ref1;
          if (responseObject != null) {
            if ((ref = responseObject.data) != null) {
              if ((ref1 = ref.children) != null) {
                ref1.forEach(function(post) {
                  var ref2, ref3, ref4;
                  if (post != null ? (ref2 = post.data) != null ? (ref3 = ref2.preview) != null ? (ref4 = ref3.images) != null ? ref4.length : void 0 : void 0 : void 0 : void 0) {
                    return _this.items.add({
                      title: post.data.title,
                      image_url: post.data.preview.images[0].source.url
                    });
                  }
                });
              }
            }
          }
          return _this.endLoading();
        };
      })(this));
    };

    return App;

  })();

  module.exports = new App();

}).call(this);