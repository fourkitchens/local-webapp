define([ 'app', 'lodash', 'backbone' ], function(app, _, Backbone) {
  var Static = app.module();

  Static.Views.View = Backbone.View.extend({
    tagName: 'section',
    initialize: function(options) {
      this.template = options.template;
      this.id = options.id;
    },
    serialize: function() {
      return { id: this.id };
    }
  });

  return Static;
});
