define([ 'app', 'lodash', 'backbone' ], function(app, _, Backbone) {
  var Static = app.module();

  Static.Views.AboutView = Backbone.View.extend({
    template: 'about'
  });

  Static.Views.ExecutiveSummaryView = Backbone.View.extend({
    template: 'executive-summary'
  });

  Static.Views.About4KView = Backbone.View.extend({
    template: 'about-4k'
  });

  Static.Views.ProcessView = Backbone.View.extend({
    template: 'process'
  });

  Static.Views.VisionView = Backbone.View.extend({
    template: 'vision'
  });

  Static.Views.ScopeView = Backbone.View.extend({
    template: 'scope'
  });

  Static.Views.TimelineView = Backbone.View.extend({
    template: 'timeline'
  });

  Static.Views.TimeCostView = Backbone.View.extend({
    template: 'time-cost'
  });

  Static.Views.CaseStudiesView = Backbone.View.extend({
    template: 'case-studies'
  });

  Static.Views.ReferencesView = Backbone.View.extend({
    template: 'references'
  });

  Static.Views.WebChefsView = Backbone.View.extend({
    template: 'web-chefs'
  });

  Static.Views.ThanksView = Backbone.View.extend({
    template: 'thanks'
  });

  return Static;
});
