define([
  'lodash',
  // Application.
  'app',
  'modules/sections',
  'modules/static'
],

function(_, app, Sections, Static) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      app.useLayout('main');
      app.layout.setViews({
        '#page-about': this.aboutSections,
        '#page-executive-summary': this.executiveSummary,
        '#page-about-4k': this.about4K,
        '#page-process': this.process,
        '#page-vision': this.vision,
        '#page-scope': this.scope,
        '#page-timeline': this.timeline,
        '#page-time-cost': this.timeCost,
        '#page-case-studies': this.caseStudies,
        '#page-references': this.references,
        '#page-web-chefs': this.webChefs,
        '#page-blog': this.blogSectionsList
      });
      app.layout.render(function(el) {
        if (Modernizr.touch) {
          window.mySwipe = new Swipe(document.getElementById('layout'), {
            speed: 400,
            callback: function(event, index, elem) {
              $('html, body').animate({ scrollTop: 0 }, 'fast');
            }
          });
        }
      });
    },

    initialize: function() {
      this.aboutSections = new Static.Views.AboutView();
      this.executiveSummary = new Static.Views.ExecutiveSummaryView();
      this.about4K = new Static.Views.About4KView();
      this.process = new Static.Views.ProcessView();
      this.vision = new Static.Views.VisionView();
      this.scope = new Static.Views.ScopeView();
      this.timeline = new Static.Views.TimelineView();
      this.timeCost = new Static.Views.TimeCostView();
      this.caseStudies = new Static.Views.CaseStudiesView();
      this.references = new Static.Views.ReferencesView();
      this.webChefs = new Static.Views.WebChefsView();
      this.webBlogSections = new Sections.WebCollection();
      this.sqlBlogSections = new Sections.WebSQLCollection();
      this.blogSectionsList = new Sections.Views.List({
        id: 'blog',
        title: 'From the Four Kitchens Blog',
        collection: this.sqlBlogSections
      });

      this.sqlBlogSections.fetch({
        success: _.bind(this.fetchWebBlogSections, this),
        error: _.bind(this.fetchWebBlogSections, this)
      });

    },

    fetchWebBlogSections: function() {
      this.webBlogSections.fetch({
        /**
         * Checks to see if the entities from the web have already
         * been stored in WeBSQL. If not, store them there and update
         * the DOM.
         */
        success: _.bind(function(collection, response, options) {
          response.forEach(_.bind(function(section) {
            if (this.sqlBlogSections.where({ guid: section.guid }).length === 0) {
              this.sqlBlogSections.create(section);
            }
          }, this));
        }, this)
      });
    }
  });

  return Router;
});

