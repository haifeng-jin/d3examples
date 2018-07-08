

var name = "architecture";
var svg = d3.select("#network")
marker(svg, "black");
var network_json = {node_list: [10, 5, 8, 9], skip_list: [{from: 0, to: 2, id: 0}, {from: 1, to: 3, id: 1}]};
var networks = [
  {node_list: [0, 5, 8, 9], skip_list: [{from: 0, to: 2, id: 0}, {from: 1, to: 3, id: 1}]},
  {node_list: [1, 5, 8, 9], skip_list: [{from: 0, to: 2, id: 0}, {from: 1, to: 3, id: 1}]},
  {node_list: [2, 5, 8, 9], skip_list: [{from: 0, to: 2, id: 0}, {from: 1, to: 3, id: 1}]},
  {node_list: [3, 5, 8, 9], skip_list: [{from: 0, to: 2, id: 0}, {from: 1, to: 3, id: 1}]},
  {node_list: [4, 5, 8, 9], skip_list: [{from: 0, to: 2, id: 0}, {from: 1, to: 3, id: 1}]}
  ]
draw_network(network_json, svg);
clean();
draw_network(network_json, svg);

function clean() {
  $("#architecture").remove();
}

function draw_network(network_json, svg) {
  var network = new Network(250, 50, network_json.node_list, name);

  for (var i = 0; i < network_json.skip_list.length; i++) {
    var link = network_json.skip_list[i];
    network.skip(link.from, link.to, "black");
  }
  network.draw(svg);
}


var treeData =
  {
    "name": 0,
    "children": [
      {
        "name": 1,
        "children": [
          { "name": 2 },
          { "name": 3 }
        ]
      },
      { "name": 4 }
    ]
  };

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#tree")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var tree = new Tree(treeData);
tree.draw(svg);





function update_network(name) {
  clean();
  draw_network(networks[name], d3.select("#network"));
}
