define([
  // Application.
  "app",
  "modules/sections"
],

function(app, Sections) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {

    },

    initialize: function() {
      this.sections = new Sections.Collection();
      this.sectionsList = new Sections.Views.List({
        collection: this.sections
      });

      app.layout.setViews({
        '.main': this.sectionsList
      });
    }
  });

  return Router;

});
