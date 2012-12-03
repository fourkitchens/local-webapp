define([
  'lodash',
  // Application.
  'app',
  'modules/sections'
],

function(_, app, Sections) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      app.useLayout('main')
      app.layout.setViews({
        '#page': this.aboutSectionsList
      });
      app.layout.render();
    },

    initialize: function() {
      this.webAboutSections = new Sections.WebCollection();
      this.sqlAboutSections = new Sections.WebSQLCollection();
      this.aboutSectionsList = new Sections.Views.List({
        id: 'about',
        collection: this.sqlAboutSections
      });

      this.sqlAboutSections.fetch({
        success: _.bind(this.fetchWebAboutSections, this),
        error: _.bind(this.fetchWebAboutSections, this)
      });

      app.useLayout('main')
      app.layout.setViews({
        '#page': this.aboutSectionsList
      });
    },

    fetchWebAboutSections: function() {
      this.webAboutSections.fetch({
        success: _.bind(function(collection, response, options) {
          response.forEach(_.bind(function(section) {
            if (this.sqlAboutSections.where(section).length === 0) {
              this.sqlAboutSections.create(section);
            }
          }, this));
        }, this)
      });
    }
  });

  return Router;
});

