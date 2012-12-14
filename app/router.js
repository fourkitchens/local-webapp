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
        '#page-blog': this.blogSectionsList,
        '#page-thanks': this.thanks
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
        title: 'It Works Offline!',
        id: 'page-executive-summary',
        pageIndex: 1
      });

      this.about4K = new Static.Views.About4KView();
      this.tocItems.create({
        title: 'Neat Huh?',
        id: 'page-about-4k',
        pageIndex: 2
      });

      this.process = new Static.Views.ProcessView();
      this.tocItems.create({
        title: 'About the Blog',
        id: 'page-process',
        pageIndex: 3
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
        pageIndex: 4
      });

      this.sqlBlogSections.fetch({
        success: _.bind(this.fetchWebBlogSections, this),
        error: _.bind(this.fetchWebBlogSections, this)
      });

      this.thanks = new Static.Views.ThanksView();
      this.tocItems.create({
        title: 'Thanks!',
        id: 'page-thanks',
        pageIndex: 5
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

