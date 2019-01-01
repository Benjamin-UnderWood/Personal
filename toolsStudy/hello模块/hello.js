'use strict';

function Person(name, age) {
    this.name = name;
    this.age = age;
    console.log(this.name, this.age);
}


var s = 'Hello';

function greet(name) {
    console.log(s + ', ' + name + '!');
}

var motionModule = (function () {
    return {
        glideMixin: function (obj) {
            obj.glide = function() {
            console.log("在水面上滑翔");
            };
        },
        flyMixin: function(obj) {
            obj.fly = function() {
            console.log("Flying, wooosh!");
            };
        }
    }
    }) (); // 两个括号导致函数立即被执行

module.exports = {
    greet,
    Person,
    motionModule
}
