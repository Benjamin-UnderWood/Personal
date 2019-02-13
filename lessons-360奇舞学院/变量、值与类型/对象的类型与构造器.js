// 假如 js 没有 'new' 操作符, 我们该如何实现创建对象
function defineClass(initializer, proto) {
  
  return function f(...args) {
    let obj = Object.create(proto);
    f.prototype = proto; // just let instanceof make sense
    obj.constructor = initializer;
    obj.constructor(...args);

    return obj;
  }
}

var Point = defineClass(function(x, y) {
  this.x = x;
  this.y = y;
}, {
  getLength() {
    let {x, y} = this;
    return Math.sqrt(x * x + y * y);
  }
});

var p = Point(3, 4);
console.log([p.getLength(), 
  p instanceof Point, // f.prototype = proto 即能骗过js引擎 使得 instanceof 结果为true
  p instanceof Object]); 
// [5, true, true]

// 所以 'new' 其实是一种语法糖  