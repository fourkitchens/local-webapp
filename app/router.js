define([
  'lodash',
  // Application.
  'app',
  'modules/sections',
  'modules/static',
  'modules/menu',
  'conf'
],

function(_, app, Sections, Static, Menu, Config) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      ':page': 'page'
    },

    index: function() {
      app.useLayout('main');

      app.layout.setViews(this.views);
      app.layout.render(_.bind(function(el) {
        this.rendered = true;
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
        if (!Modernizr.touch) {
          var self = this;
          $('.swipe').remove();
          var $section = $('section');
          $section.append('<div class="box"><div class="prev">&laquo; Previous</div><div class="next">Next &raquo;</div></div>');
          $('.prev', $($section[0])).remove();
          $('.next', $($section[$section.length - 1])).remove();
          $('.prev').click(function(e) {
            var page = self.tocItems.get($(this).parents('section')[0].id);
            app.mySwipe.slide(page.get('pageIndex') - 1);
          });
          $('.next').click(function(e) {
            var page = self.tocItems.get($(this).parents('section')[0].id);
            app.mySwipe.slide(page.get('pageIndex') + 1);
          });
        }
        $('body').css({ overflow: 'auto' });
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
      this.views = {
        '#menu': this.menu,
        '#sections': []
      };

      var pageIndex = 0;
      Config.sections.forEach(_.bind(function(section) {
        if (Config.blog && pageIndex == Config.blogIndex) {
          this.addBlog(pageIndex);
          pageIndex++;
        }

        this.views['#sections'].push(new Static.Views.View(section));
        this.tocItems.create({
          title: section.title,
          id: section.id,
          pageIndex: pageIndex
        });
        pageIndex++;
      }, this));
      if (Config.blog && pageIndex == Config.blogIndex) {
        this.addBlog(pageIndex);
      }
    },

    addBlog: function(pageIndex) {
      this.webBlogSections = new Sections.WebCollection();
      this.sqlBlogSections = new Sections.WebSQLCollection();
      this.blogSectionsList = new Sections.Views.List({
        id: 'page-blog',
        sectionId: 'blog',
        title: 'From the Four Kitchens Blog',
        collection: this.sqlBlogSections,
        webCollection: this.webBlogSections
      });
      this.views['#sections'].push(this.blogSectionsList);
      this.tocItems.create({
        title: 'From the Four Kitchens Blog',
        id: 'page-blog',
        pageIndex: pageIndex
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

