'use strict';

var Module = require('./hello');
console.log(Module);

var Person = Module.Person;
var xiaoming = new Module.Person('xiaoming', 23);

var greet = Module.greet;
var s = 'Michael';

greet(s); // Hello, Michael!


var motionModule = Module.motionModule;
var duck = {};

motionModule.glideMixin(duck);
duck.glide();

