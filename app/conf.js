if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define([ ], function() {
  return {
    // The title that will be used throughout the site.
    title: 'Gateway',
    // true if you want to include the 4k blog.
    blog: false,
    // Set the position in the menu for the blog.
    blogIndex: 1,
    // List the sections in the order that you want
    // them displayed.
    sections: [
    ]
  };
});

