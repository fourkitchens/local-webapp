var flatiron = require('flatiron'),
    path = require('path'),
    img64 = require('img64'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);
app.use(
  require(path.join(__dirname, 'plugins', 'feed')),
  { feed: app.config.get('feed') }
);

app.router.get('/feed', function() {
  var self = this;
  app.fetchFeed(function(err, articles) {
    if (err) {
      app.log.error(err);
      self.res.writeHead(500);
      self.res.end();
      return;
    }
    // Convert images to base64 encoded images.
    var converted = 0;
    articles.forEach(function(article, i) {
      img64.encodeImgs(article.description, function(err, doc) {
        if (err) {
          app.log.error(err);
        }
        articles[i].description = doc;
        app.emit('converted');
      });
    });

    app.on('converted', function() {
      converted++;
      if (converted === articles.length) {
        self.res.json(articles);
      }
    });
  });
});

app.start(app.config.get('port') || 3000);

