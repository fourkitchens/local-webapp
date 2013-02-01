if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define([ ], function() {
  return {
    // The title that will be used throughout the site.
    title: 'Microfinance Gateway Proposal',
    // true if you want to include the 4k blog.
    blog: false,
    // Set the position in the menu for the blog.
    blogIndex: 1,
    // List the sections in the order that you want
    // them displayed.
    sections: [
      {
        title: 'Introduction', // The title to display in the app menu.
        id: 'page-into', // The ID to anchor the menu to. This should be unique.
        template: 'static/10-intro' // The template to use.
      },
      {
        title: 'About Four Kitchens', // The title to display in the app menu.
        id: 'page-about', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/20-about' // The template to use.
      },
      {
        title: 'Project Vision', // The title to display in the app menu.
        id: 'page-projvision', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/30-projvision' // The template to use.
      },
      {
        title: 'Project Scope', // The title to display in the app menu.
        id: 'page-projscope', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/40-projscope' // The template to use.
      },
      {
        title: 'Questions from SOW', // The title to display in the app menu.
        id: 'page-questions', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/50-questions' // The template to use.
      },
      {
        title: 'Time and Cost Estimates', // The title to display in the app menu.
        id: 'page-estimates', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/60-estimates' // The template to use.
      },
      {
        title: 'References', // The title to display in the app menu.
        id: 'page-references', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/70-references' // The template to use.
      },
      {
        title: 'Meet the Web Chefs', // The title to display in the app menu.
        id: 'page-webchefs', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/80-webchefs' // The template to use.
      },
      {
        title: 'Appendix', // The title to display in the app menu.
        id: 'page-appendix', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/90-appendix' // The template to use.
      }
    ]
  };
});

