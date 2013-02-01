define([ ], function() {
  return {
    // true if you want to include the 4k blog.
    blog: true,
    // Set the position in the menu for the blog.
    blogIndex: 1,
    // List the sections in the order that you want
    // them displayed.
    sections: [
      {
        title: 'About This App', // The title to display in the app menu.
        id: 'page-about', // The ID to anchor the menu to. This should be unique.
        template: 'static/about' // The template to use.
      },
      {
        title: 'Thanks!', // The title to display in the app menu.
        id: 'page-thanks', // The ID from the template to anchor the menu to. This should be unique.
        template: 'static/thanks' // The template to use.
      }
    ]
  };
});

