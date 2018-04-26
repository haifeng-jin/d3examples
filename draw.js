

var name1 = "f_a";
var name2 = "f_b";
var network1 = new Network(50, 20, [10, 5, 7], name1);
var network2 = new Network(150, 20, [11, 20, 6, 8], name2);
var node_matches = [[0, 0], [1, 2], [2, 3]];
var svg = d3.select("#network")
for (var i = 0; i < node_matches.length; i++) {
  var path = new RoundPath(network1.node_center(node_matches[i][0]),
  network2.node_center(node_matches[i][1]),
  25);
  path.draw(svg);
}
network1.draw(svg);
network2.draw(svg);

marker(svg, "black");
svg.append("path")
   .attr("d", "M 200 180 L 300 180")
   .attr("class", "arrow")
   .attr("marker-end", "url(#black)");

svg.append("text")
   .attr("x", 250)
   .attr("y", 150)
   .attr("class", "arrow-text")
   .text("Wider Layers");

var network1 = new Network(350, 20, [11, 6, 8], name1);
var network2 = new Network(450, 20, [11, 20, 6, 8], name2);
var node_matches = [[0, 0], [1, 2], [2, 3]];
var svg = d3.select("#network")
for (var i = 0; i < node_matches.length; i++) {
  var path = new RoundPath(network1.node_center(node_matches[i][0]),
  network2.node_center(node_matches[i][1]),
  25);
  path.draw(svg);
}
network1.draw(svg);
network2.draw(svg);

marker(svg, "black");
svg.append("path")
   .attr("d", "M 500 180 L 600 180")
   .attr("class", "arrow")
   .attr("marker-end", "url(#black)");

svg.append("text")
   .attr("x", 550)
   .attr("y", 150)
   .attr("class", "arrow-text")
   .text("Insert Layers");

var network1 = new Network(650, 20, [11, 20, 6, 8], name1);
var network2 = new Network(750, 20, [11, 20, 6, 8], name2);
var node_matches = [[0, 0], [2, 2], [3, 3]];
var svg = d3.select("#network")
for (var i = 0; i < node_matches.length; i++) {
  var path = new RoundPath(network1.node_center(node_matches[i][0]),
  network2.node_center(node_matches[i][1]),
  25);
  path.draw(svg);
}
network1.draw(svg);
network2.draw(svg);

// svg = d3.select("#network-skip")
marker(svg, "green");
marker(svg, "orange");
var network1 = new Network(950, 20, [10, 5, 8, 9], name1);
var network2 = new Network(1050, 20, [11, 20, 6, 7], name2);
network1.skip(0, 2, "green");
network1.skip(1, 3, "orange");
network1.draw(svg);
network2.skip(0, 2, "green");
network2.skip(0, 3, "orange");
network2.draw(svg);
