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
        id: 'page-about', // The ID to anchor the menu to. This should be unique.
        template: 'static/10-intro' // The template to use.
      } /*,
      {
        title: 'Thanks!', // The title to display in the app menu.
        id: 'page-thanks', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/thanks' // The template to use.
      } */
    ]
  };
});

