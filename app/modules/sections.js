define(['app', 'lodash', 'backbone'], function(app, _, Backbone) {
  var Sections = app.module();

  Sections.Model = Backbone.Model.extend({
    defaults: function() {
      return {
        title: 'Four Kitchens',
        summary: 'Brooklyn magna eros at diam risus Portland massa quisque lectus porta at cred quam eget arcu orci. Eget Toms molestie et eget non odio VHS lorem pharetra fusce at quam bahn mi tempus congue tellus tellus mattis. PBR sodales vulputate vitae eu pellentesque undefined tellus justo sed arcu et wire-rimmed glasses morbi vivamus non. Urna gravida artisan non donec pellentesque congue vivamus DIY quisque maecenas eros a tempus tofu sagittis. Mauris non integer sagittis organic orci curabitur cursus vivamus nibh tattoo sagittis lorem justo massa quisque Austin tempus. Eu sem ut eu farm-to-table fusce tempus integer proin malesuada specs in in eu sodales quam vegan. Orci porttitor urna amet integer Austin ipsum vulputate proin justo ut DIY orci molestie elementum proin vulputate.'
      };
    }
  });

  Sections.Collection = Backbone.Collection.extend({
  });

  Sections.Views.Item = Backbone.View.extend({
    template: 'box'
  });

  SectionsViews.List = Backbone.View.extend({
  });
});
