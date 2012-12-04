var parser = require('feedparser');

var Feed = exports.attach = function(options) {

  /**
   * Fetches RSS feed and turns the articles into a JavaScript array.
   *
   * @param {function} callback
   *   The callback to execute when the feed has been fetched.
   */
  this.fetchFeed = function(callback) {
    parser.parseUrl(options.feed)
      .on('complete', function(meta, articles) {
        callback(null, articles);
      })
      .on('error', function(err) {
        callback(err, null);
      });
  };

};

Feed.init = function(done) {
  return done();
};

