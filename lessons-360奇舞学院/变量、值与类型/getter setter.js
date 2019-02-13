Object.defineProperty(Point2D.prototype, 'length', {
  get: function() {
    let {x, y} = this;
    return Math.sqrt(x * x + y * y);
  },
  set: function(len) {
    let arc = Math.atan2(this.y, this.x);
    this.x = len * Math.cos(arc);
    this.y = len * Math.sin(arc);
  }
});

Object.defineProperty(Pointe2D.prototype, 'arc', {
  get: function() {
    let {x, y} = this;
    return 180 * Math.atan2(y, x) / Math.PI;
  },
  set: function(arc) {
    arc = Math.PI * arc / 180;
    let len = this.length;
    this.x = len * Math.cos(arc);
    this.y = len * Math.sin(arc);
  }
});

let p = new Point2D(1, 1);

console.log([p.length, p.arc]); // [1.414, 45]

p.length *= 2;

console.log([p.x, p.y]); // [2, 2];

p.arc = 30;

console.log([p.x, p.y]);