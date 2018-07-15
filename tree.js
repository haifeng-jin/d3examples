var Tree = function(data) {
  this.data = data;
  // declares a tree layout and assigns the size
  this.treemap = d3.tree().size([height, width]);
  // Assigns parent, children, height, depth
  var root = d3.hierarchy(data, function(d) { return d.children; });
  root.x0 = height / 2;
  root.y0 = 0;
  this.root = root;
  // Collapse after the second level
  this.root.children.forEach(collapse);

  this.duration = 750;
}

Tree.prototype.draw = function(svg) {
  this.svg = svg;
  this.update(this.root);
}

// Collapse the node and all it's children
function collapse(d) {
  return;
  if(d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

// Creates a curved (diagonal) path from parent to the child nodes
function diagonal(s, d) {

  path = `M ${s.y} ${s.x}
          C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`;

  return path;
}

Tree.prototype.update = function(source) {

  // Assigns the x and y position for the nodes
  var treeData = this.treemap(this.root);

  // Compute the new tree layout.
  this.nodes = treeData.descendants(),
  this.links = treeData.descendants().slice(1);

  var self = this;
  var i = 0;


  // Normalize for fixed-depth.
  this.nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = this.svg.selectAll('g.node')
      .data(this.nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click',function(d) {
      if (d.children) {
        console.log(d);
        d._children = d.children;
        d.children = null;
        self.update(d);
      } else if (d._children) {
        d.children = d._children;
        d._children = null;
        self.update(d);
      }
      update_network(d.data.name);
    });

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('r', 15)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(this.duration)
    .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle')
    .attr('r', 15)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = this.svg.selectAll('path.link')
      .data(this.links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(this.duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  this.nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

}
