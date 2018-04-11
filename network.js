var RoundPath = function(p1, p2, r) {
  console.log(p1, p2);
  this.p1 = p1;
  this.p2 = p2;
  this.r = r;
}

RoundPath.prototype.draw = function(svg) {
  var r = this.r;
  var v1 = this.p2.subtract(this.p1);
  var v2 = v1.vectorRotate90().vectorUnit().multiply(this.r);

  var p1_high = this.p1.add(v2);
  var p1_low = this.p1.subtract(v2);

  var p2_high = this.p2.add(v2);
  var p2_low = this.p2.subtract(v2);

  var d = "M " + p1_high.x + "," + p1_high.y + " ";
  d += "L " + p2_high.x + "," + p2_high.y + " "
  d += "A " + v2.length() + " " + v2.length() + " 0 0 0 ";
  d += p2_low.x + " " + p2_low.y + " ";
  d += "L " + p1_low.x + "," + p1_low.y + " ";
  d += "A " + v2.length() + " " + v2.length() + " 0 0 0 ";
  d += p1_high.x + " " + p1_high.y + " ";
  d += "Z";
  svg.append("path")
    .attr("class", "round-path")
    .attr("d", d);
}

var Network = function(x, y, n_node) {
  this.r = 15;
  this.arrow_len = 70;
  this.n_node = n_node;
  this.x = x;
  this.y = y;
}

Network.prototype.node_center = function(node_id) {
  return new Point(this.x, this.y + node_id * this.arrow_len);
}

Network.prototype.draw = function(svg) {
  for (var i = 0; i < this.n_node; i++) {
    var p = this.node_center(i);
    svg.append("circle")
      .attr("class", "node")
      .attr("cx", p.x)
      .attr("cy", p.y)
      .attr("r", this.r);
  }
  for (var i = 0; i < this.n_node - 1; i++) {
    var p1 = this.node_center(i);
    var p2 = this.node_center(i + 1);
    svg.append("line")
      .attr("class", "link")
      .attr("x1", p1.x)
      .attr("x2", p2.x)
      .attr("y1", p1.y + this.r)
      .attr("y2", p2.y - this.r);
  }
}

var network1 = new Network(20, 20, 4);
var network2 = new Network(150, 20, 6);
var node_matches = [[0, 0], [1, 2], [2, 4], [3, 5]];
for (var i = 0; i < node_matches.length; i++) {
  console.log(i);
  var path = new RoundPath(network1.node_center(node_matches[i][0]),
  network2.node_center(node_matches[i][1]),
  20);
  path.draw(d3.select("#network"));
}
network1.draw(d3.select("#network"));
network2.draw(d3.select("#network"));
