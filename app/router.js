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
      app.useLayout('main')
      app.layout.setViews({
        '#app': this.aboutSectionsList
      });
    },

    initialize: function() {
      this.aboutSections = new Sections.Collection();
      this.aboutSectionsList = new Sections.Views.List({
        id: 'about',
        collection: this.aboutSections
      });

      app.useLayout('main')
      app.layout.setViews({
        '#app': this.aboutSectionsList
      });
    }
  });

  return Router;
});

