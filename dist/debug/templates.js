this["JST"] = this["JST"] || {};

this["JST"]["app/templates/box.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="box">\n  <img src="{{image}}">\n  <h2>{{title}}</h2>\n  <p><span class="summary">{{summary}}</span></p>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/layouts/main.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="page"></div>\n';
}
return __p;
};