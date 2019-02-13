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

Object.defineProperty