# localStorage webapp prototype

An experiment by [Four Kitchens](http://fourkitchens.com)

## Getting started

Before you can inject any content into the app you need to copy ```app/example.conf.js``` to ```app/conf.js```.
This file will contain the list of sections to use in your app as well as some other valuable metadata.

## Static content

To add a static page to the app, first add the html in ```app/templates/static/{{template-name}}.html```
where ```{{template-name}}}``` is an arbitrary name for the content you want to add.

Then, update conf.js and add a new section to the ```sections``` array, the format is as follows:

```JavaScript
{
  title: 'About This App', // The title to display in the app menu.
  id: 'page-about', // The ID to anchor the menu to. This should be unique.
  template: 'static/about' // The template to use.
}
```

## Dev notes

### Compass

The following compass gems should be installed"

* compass-aurora
* animation --pre

### LiveReload

If you have LiveReload on your local machine, you can use it on a
mobile device by looking up your LAN IP (not external IP) and visiting that IP
on each device. LiveReload's script at the top of index.html will automatically
detect your local server and do its magic!

### grunt/bbb

You should build the application using ```bbb release``` (a backbone
wrapper for grunt).

You can also cause the application to be rebuilt automatically when you change
sass or JavaScript files using ```bbb watch```.

Before you can get started with grunt run ```npm install``` from this directory.

### require.js and compiled sources

The JavaScript is now compiled with require.js. This obviously isn't very useful
if you need to debug something, so change the require path in index.html to ```/dist/debug/require.js```.


Similarly, if you need to see unminified CSS change the stylesheet path to ```/dist/debug/main.css```.

