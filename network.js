var RoundPath = function(p1, p2, r) {
  this.p1 = p1;
  this.p2 = p2;
  this.r = r;
}

function marker (svg, color) {
    var val = color;
    svg.select("defs")
         .append("marker")
         .attr("id", val)
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 4)
         .attr("refY", 2)
         .attr("markerWidth", 10)
         .attr("markerHeight", 10)
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,0  L4,2 L0,4 Z")
         .style("fill", color);
    return "url(#" +val+ ")";
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

var Network = function(x, y, node_widths, name) {
  this.r = 15;
  this.arrow_len = 70;
  this.n_node = node_widths.length;
  this.node_widths = node_widths;
  this.x = x;
  this.y = y;
  this.name = name;
  this.skip_connections = [];
  this.y_offset = 60;
  this.x_offset = 8;
}

Network.prototype.node_center = function(node_id) {
  return new Point(this.x, this.y + node_id * this.arrow_len + this.y_offset);
}

Network.prototype.draw = function(svg) {
    var _this = this;
    svg = svg.append("g").attr("id", name);
      // <foreignObject>\(\displaystyle{x+1\over y-1}\)</foreignObject>
    // svg.append("foreignObject")
    //   .attr("x", this.x - this.x_offset)
    //   .attr("y", this.y)
    //   .text(this.name);
      // .text("\\(\\displaystyle " + this.name + "\\)");
    var svgs = svg.selectAll("g")
      .data(this.node_widths)
      .enter()
      .append("g")

    svg.append("defs");
    svgs.append("circle")
      .attr("class", "node")
      .attr("cy", function(d, i) {
        return _this.node_center(i).x;
      })
      .attr("cx", function(d, i) {
        return _this.node_center(i).y;
      })
      // .attr("cy", p.y)
      .attr("r", this.r);

    svgs.append("text")
      .attr("y", function(d, i) {
        return _this.node_center(i).x;
      })
      .attr("x", function(d, i) {
        return _this.node_center(i).y;
      })
      .text(function(d, i) { return _this.node_widths[i];});

    svg.selectAll("g")
      .data(this.node_widths.slice(0, -1))
      .append("line")
      .attr("class", "link")
      .style("stroke", "black")
      .attr("y1", function(d, i) {
        return _this.node_center(i).x;
      })
      .attr("y2", function(d, i) {
        return _this.node_center(i + 1).x;
      })
      .attr("x1", function(d, i) {
        return _this.node_center(i).y + _this.r;
      })
      .attr("x2", function(d, i) {
        return _this.node_center(i + 1).y - _this.r;
      })
      .style("marker-end", "url(#black)");

    svg.selectAll("path")
      .data(this.skip_connections)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", function (d) {
        var p1 = _this.node_center(d[0]);
        var p2 = _this.node_center(d[1]);
        var distance = p2.subtract(p1).length();
        var r = distance * 1;
        var v = p2.subtract(p1).vectorUnit().multiply(_this.r);
        p1 = p1.subtract(v.vectorRotate(- Math.PI - Math.PI / 6.0));
        p2 = p2.subtract(v.vectorRotate(Math.PI / 6.0));
        d = "M " + p1.y + " " + p1.x + " ";
        d += "A " + r + " " + r + " 0 0 0 " + p2.y + " " + p2.x + " ";
        return d;
      })
      .attr("stroke", function (d) {
        return d[2];
      })
      .attr("marker-end", function (d) {
        return "url(#" + d[2] + ")";
      });
}

Network.prototype.skip = function(n1, n2, color) {
  this.skip_connections.push([n1, n2, color]);
}
