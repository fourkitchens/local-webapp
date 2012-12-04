define([ 'app', 'lodash', 'backbone' ], function(app, _, Backbone) {
  var db = openDatabase('sections', '', 'sections', 1024 * 1024);
  var Sections = app.module();

  Sections.Model = Backbone.Model.extend({
    defaults: function() {
      return {
        title: 'Four Kitchens',
        summary: 'Brooklyn magna eros at diam risus Portland massa quisque lectus porta at cred quam eget arcu orci. Eget Toms molestie et eget non odio VHS lorem pharetra fusce at quam bahn mi tempus congue tellus tellus mattis. PBR sodales vulputate vitae eu pellentesque undefined tellus justo sed arcu et wire-rimmed glasses morbi vivamus non. Urna gravida artisan non donec pellentesque congue vivamus DIY quisque maecenas eros a tempus tofu sagittis. Mauris non integer sagittis organic orci curabitur cursus vivamus nibh tattoo sagittis lorem justo massa quisque Austin tempus. Eu sem ut eu farm-to-table fusce tempus integer proin malesuada specs in in eu sodales quam vegan. Orci porttitor urna amet integer Austin ipsum vulputate proin justo ut DIY orci molestie elementum proin vulputate.',
        image: 'http://2.bp.blogspot.com/_1xHCqFHSKVo/TB6GjhWbroI/AAAAAAAAAmw/JbSwcHF3Kgg/s1600/rainbow-cat.jpg'
      };
    },
    sync: Backbone.WebSQLSync
  });

  Sections.WebCollection = Backbone.Collection.extend({
    model: Sections.Model,
    url: '/sample.json'
  });

  Sections.WebSQLCollection = Backbone.Collection.extend({
    model: Sections.Model,
    store: new WebSQLStore(db, 'sections'),
    sync: Backbone.WebSQLSync,
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === undefined) options.parse = true;
      var collection = this;
      var success = options.success;

      db.transaction(_.bind(function(tx) {
        tx.executeSql("SELECT * FROM sections", [], _.bind(function(tx, results) {
          var resp = [];
          if (results.rows && results.rows.length) {
            for (var i = 0; i < results.rows.length; i++) {
              var item = JSON.parse(results.rows.item(i).value);
              collection.create(item);
              resp.push(item);
            }
          }

          if (success) {
            success(collection, resp);
          }
          options.error = Backbone.wrapError(options.error, collection, options);
          return (this.sync || Backbone.sync).call(this, 'read', this, options);
        }, this));
      }, this));
    }
  });

  Sections.Views.Item = Backbone.View.extend({
    template: 'box',
    serialize: function() {
      return this.model.toJSON();
    }
  });

  Sections.Views.List = Backbone.View.extend({
    tagName: 'section',

    beforeRender: function() {
      this.$el.attr('id', this.id);
      this.$el.children().remove();
      this.collection.each(function(box) {
        this.insertView(new Sections.Views.Item({
          model: box
        }));
      }, this);
    },

    cleanup: function() {
    },

    addSection: function(section) {
      var view = new Sections.Views.Item({
        model: section
      });

      view.render();
      this.$el.append(view.$el);
    },

    initialize: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.addSection, this);
    }
  });

  return Sections;
});

