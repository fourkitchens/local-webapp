define([ 'app', 'lodash', 'backbone' ], function(app, _, Backbone) {
  var Menu = app.module();

  Menu.TOCModel = Backbone.Model.extend({
    defaults: function() {
      return {
        title: '',
        id: 'page-foo',
        pageIndex: 0
      };
    },
    sync: function(method, model, options) {
      // Noop.
      return;
    }
  });

  Menu.TOCCollection = Backbone.Collection.extend({
    model: Menu.TOCModel
  });

  Menu.Views.TOCItem = Backbone.View.extend({
    tagName: 'li',
    template: 'tocItem',
    serialize: function() {
      return this.model.toJSON();
    }
  });

  Menu.Views.MenuList = Backbone.View.extend({
    template: 'menu',
    events: {
      'click #toc-handle': 'toggleToc',
      'click .toc-link': 'toggleToc'
    },
    beforeRender: function() {
      this.collection.each(function(item) {
        this.insertView('#toc', new Menu.Views.TOCItem({
          model: item
        }));
      }, this);
    },
    toggleToc: function(e) {
      e.preventDefault();
      $('.menu-wrapper', this.$el).slideToggle('fast');
    }
  });

  return Menu;
});

