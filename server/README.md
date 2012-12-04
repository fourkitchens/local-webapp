# Server

Herein lies the code for the node.js server for the local webapp.

To get started, execute

```
npm install
node app
```

## Reverse proxy support

In order to avoid needing to do a cross-domain dance, set up your webserver
to use a reverse proxy and pass through requests to /server to the node
application. I'm a hipster so I'll show you how to do this with nginx here:

```nginx
rewrite ^/server$ /server/ permanent;

location ~ "^/server/?(.*)?$" {
  proxy_pass http://127.0.0.1:3000/$1;
  proxy_set_header X-Real-IP $remote_addr;
}
```

