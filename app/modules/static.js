define([ 'app', 'lodash', 'backbone' ], function(app, _, Backbone) {
  var Static = app.module();

  Static.Views.AboutView = Backbone.View.extend({
    template: 'about'
  });

  return Static;
});
