var flatiron = require('flatiron'),
    path = require('path'),
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
    self.res.json(articles);
  });
});

app.start(app.config.get('port') || 3000);

