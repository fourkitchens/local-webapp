var FTScrollerOptions = {};

define([
  'lodash',
  'jquery',

  // Application.
  'app',
  'modules/sections',
  'modules/static'
],

function(_, $, app, Sections, Static) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      app.useLayout('main');
      var pages = {
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
      };
      app.layout.setViews(pages);
      app.layout.render(function(el) {
        $('#layout').css({
          'white-space': 'nowrap',
          width: '100%',
          overflow: 'hidden'
        });
        var sectionWidth = $('#layout').width();
        $('.sections').css({
          width: sectionWidth * _.keys(pages).length + 'px',
          display: 'table'
        });
        $('.sections section').css({
           width: sectionWidth,
           display: 'inline-block',
           'vertical-align': 'top'
        });
        $('.sections section > div').css({
          overflow: 'hidden',
          'white-space': 'normal'
        });
        FTScrollerOptions.windowScrollingActiveFlag = 'scrolling';
        var sectionScrollers = {};
        var sectionKeys = _.keys(pages);
        var scroller = new FTScroller(document.getElementById('layout'), {
          scrollingY: false,
          scrollbars: false,
          snapping: true,
          paginatedSnap: true,
          scrollBoundary: 10,
          bouncing: false
        });
        scroller.addEventListener('segmentdidchange', function(segment) {
          var id = sectionKeys[segment.segmentX];
          if (typeof sectionScrollers[id] === 'undefined') {
            sectionScrollers[id] = new FTScroller(document.getElementById(id.replace(/^#/, '')), {
              scrollingX: false,
              scrollBoundary: 4
            });
          }
          $('#layout').height($(id).height());
          $('html, body').animate({ scrollTop: 0 }, 'fast');
        });
        var firstID = sectionKeys[0];
        sectionScrollers[firstID] = new FTScroller(document.getElementById(firstID.replace(/^#/, '')), {
          scrollingX: false,
          scrollBoundary: 4
        });
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

