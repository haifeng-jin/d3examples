
var Point = function(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.add = function(p) {
  return new Point(this.x + p.x, this.y + p.y);
}

Point.prototype.subtract = function(p) {
  return new Point(this.x - p.x, this.y - p.y);
}

Point.prototype.multiply = function(a) {
  return new Point(this.x * a, this.y * a);
}

Point.prototype.vectorRotate90 = function() {
  return new Point(-this.y, this.x);
}

Point.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

Point.prototype.vectorUnit = function() {
  return new Point(this.x * 1.0 / this.length(), this.y * 1.0 / this.length());
}
