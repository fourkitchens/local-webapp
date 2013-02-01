define([
  // Libraries.
  'jquery',
  'lodash',
  'backbone',
  'handlebars',
  'swipe',

  // Plugins.
  'plugins/backbone.layoutmanager',
  'plugins/backbone-websql'
],

function($, _, Backbone, Handlebars) {
  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: '/'
  };

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  // Configure LayoutManager with Backbone Boilerplate defaults.
  Backbone.LayoutManager.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    paths: {
      layout: 'app/templates/layouts/',
      template: 'app/templates/'
    },

    fetch: function(path) {
      var done;

      // Add the html extension.
      path = path + '.html';

      // If the template has not been loaded yet, then load.
      if (!JST[path]) {
        done = this.async();
        return $.ajax({ url: app.root + path }).then(function(contents) {
          JST[path] = Handlebars.compile(contents);
          JST[path].__compiled__ = true;

          done(JST[path]);
        });
      }

      // If the template hasn't been compiled yet, then compile.
      if (!JST[path].__compiled__) {
        JST[path] = Handlebars.template(JST[path]);
        JST[path].__compiled__ = true;
      }

      return JST[path];
    }
  });

  // Handlebars helpers.
  Handlebars.registerHelper('description', function() {
    return new Handlebars.SafeString(this.description);
  });

  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name, options) {
      // If already using this Layout, then don't re-inject into the DOM.
      if (this.layout && this.layout.options.template === name) {
        return this.layout;
      }

      // If a layout already exists, remove it from the DOM.
      if (this.layout) {
        this.layout.remove();
      }

      // Create a new Layout with options.
      var layout = new Backbone.Layout(_.extend({
        template: name,
        className: 'layout ' + name,
        id: 'layout',
        setViews: function(views) {
          // Iterate over all the views and use the View's view method to assign.
          _.each(views, function(view, name) {
            // If the view is an array put all views into insert mode.
            if (_.isArray(view)) {
              return _.each(view, function(view) {
                this.insertView(name, view);
              }, this);
            }

            // Assign each view using the view function.
            this.setView(name, view);
          }, this);

          // Allow for chaining
          return this;
        }
      }, options));

      // Insert into the DOM.
      $('#main').empty().append(layout.el);

      // Render the layout.
      layout.render();

      // Cache the refererence.
      this.layout = layout;

      // Return the reference, for chainability.
      return layout;
    }
  }, Backbone.Events);

});
