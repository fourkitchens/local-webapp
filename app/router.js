define([
  'lodash',
  // Application.
  'app',
  'modules/sections',
  'modules/static',
  'modules/menu'
],

function(_, app, Sections, Static, Menu) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      ':page': 'page'
    },

    index: function() {
      app.useLayout('main');
      var views = {
        '#menu': this.menu,
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

      app.layout.setViews(views);
      app.layout.render(_.bind(function(el) {
        this.rendered = true;
        if (Modernizr.touch) {
          app.mySwipe = new Swipe(document.getElementById('pages'), {
            speed: 400,
            callback: _.bind(function(event, index, elem) {
              $('html, body').animate({ scrollTop: 0 }, 'fast');

              var pages = this.tocItems.where({ pageIndex: index });
              if (typeof pages[0] !== 'undefined') {
                this.navigate(pages[0].id, { trigger: false, replace: true });
              }
              else {
                this.navigate('', { trigger: false, replace: true });
              }
            }, this)
          });
        }
      }, this));
    },

    page: function(page) {
      if (!this.rendered) {
        this.index();
      }
      if (typeof app.mySwipe === 'undefined' && $('#' + page).length) {
        $('html, body').animate({ scrollTop: $('#' + page).position().top }, 'fast');
      }
      else {
        page = this.tocItems.get(page);
        if (page) {
          app.mySwipe.slide(page.get('pageIndex'));
        }
      }
    },

    initialize: function() {
      this.rendered = false;
      this.tocItems = new Menu.TOCCollection();
      this.menu = new Menu.Views.MenuList({ collection: this.tocItems });

      this.aboutSections = new Static.Views.AboutView();
      this.tocItems.create({
        title: 'About This App',
        id: 'page-about',
        pageIndex: 0
      });

      this.executiveSummary = new Static.Views.ExecutiveSummaryView();
      this.tocItems.create({
        title: 'Executive Summary',
        id: 'page-executive-summary',
        pageIndex: 1
      });

      this.about4K = new Static.Views.About4KView();
      this.tocItems.create({
        title: 'About Four Kitchens',
        id: 'page-about-4k',
        pageIndex: 2
      });

      this.process = new Static.Views.ProcessView();
      this.tocItems.create({
        title: 'Our Process',
        id: 'page-process',
        pageIndex: 3
      });

      this.vision = new Static.Views.VisionView();
      this.tocItems.create({
        title: 'Project Vision',
        id: 'page-vision',
        pageIndex: 4
      });

      this.scope = new Static.Views.ScopeView();
      this.tocItems.create({
        title: 'Project Scope',
        id: 'page-scope',
        pageIndex: 5
      });

      this.timeline = new Static.Views.TimelineView();
      this.tocItems.create({
        title: 'Phased Timeline',
        id: 'page-timeline',
        pageIndex: 6
      });

      this.timeCost = new Static.Views.TimeCostView();
      this.tocItems.create({
        title: 'Time and Cost Estimates',
        id: 'page-time-cost',
        pageIndex: 7
      });

      this.caseStudies = new Static.Views.CaseStudiesView();
      this.tocItems.create({
        title: 'Case Studies',
        id: 'page-case-studies',
        pageIndex: 8
      });

      this.references = new Static.Views.ReferencesView();
      this.tocItems.create({
        title: 'References',
        id: 'page-references',
        pageIndex: 9
      });

      this.webChefs = new Static.Views.WebChefsView();
      this.tocItems.create({
        title: 'Meet the Web Chefs',
        id: 'page-web-chefs',
        pageIndex: 10
      });

      this.webBlogSections = new Sections.WebCollection();
      this.sqlBlogSections = new Sections.WebSQLCollection();
      this.blogSectionsList = new Sections.Views.List({
        id: 'blog',
        title: 'From the Four Kitchens Blog',
        collection: this.sqlBlogSections,
        webCollection: this.webBlogSections
      });
       this.tocItems.create({
        title: 'From the Four Kitchens Blog',
        id: 'page-blog',
        pageIndex: 11
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

