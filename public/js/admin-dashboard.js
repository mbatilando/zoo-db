$(document).ready(function () {

	$.ajax({
		type: 'GET',
		url: '/admin/dashboard/api/'+$('#zooId').html(),
		success: function (data) {
			var margin = {top: 30, right: 20, bottom: 30, left: 20},
    width = 400 - margin.left - margin.right,
    barHeight = 26,
    barWidth = width * .8;

	var i = 0,
	    duration = 400,
	    root;

	var tree = d3.layout.tree()
	    .nodeSize([0, 20]);

	var diagonal = d3.svg.diagonal()
	    .projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	function update(source) {
		debugger
	  // Compute the flattened node list.
	  var nodes = tree.nodes(root);

	  var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

	  d3.select("svg").transition()
	      .duration(duration)
	      .attr("height", height);

	  d3.select(self.frameElement).transition()
	      .duration(duration)
	      .style("height", height + "px");

	  // Compute the "layout".
	  nodes.forEach(function(n, i) {
	    n.x = i * barHeight;
	  });

	  // Update the nodes…
	  var node = svg.selectAll("g.node")
	      .data(nodes, function(d) { return d.id || (d.id = ++i); });

	  var nodeEnter = node.enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	      .style("opacity", 1e-6);

	  // Enter any new nodes at the parent's previous position.
	  nodeEnter.append("rect")
	      .attr("y", -barHeight / 2)
	      .attr("height", barHeight)
	      .attr("width", barWidth)
	      .style("fill", color)
	      .on("click", click);

	  nodeEnter.append("text")
	      .attr("dy", 4.5)
	      .attr("dx", 7.5)
	      .style("fill", textcolor)
	      .style("font-weight", textweight)
	      .text(function(d) { return d.name; });

	  // Transition nodes to their new position.
	  nodeEnter.transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
	      .style("opacity", 1);

	  node.transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
	      .style("opacity", 1)
	      .select("rect")
	      .style("fill", color);

	  // Transition exiting nodes to the parent's new position.
	  node.exit().transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	      .style("opacity", 1e-6)
	      .remove();

	  // Update the links…
	  var link = svg.selectAll("path.link")
	      .data(tree.links(nodes), function(d) { return d.target.id; });

	  // Enter any new links at the parent's previous position.
	  link.enter().insert("path", "g")
	      .attr("class", "link")
	      .attr("d", function(d) {
	        var o = {x: source.x0, y: source.y0};
	        return diagonal({source: o, target: o});
	      })
	    .transition()
	      .duration(duration)
	      .attr("d", diagonal);

	  // Transition links to their new position.
	  link.transition()
	      .duration(duration)
	      .attr("d", diagonal);

	  // Transition exiting nodes to the parent's new position.
	  link.exit().transition()
	      .duration(duration)
	      .attr("d", function(d) {
	        var o = {x: source.x, y: source.y};
	        return diagonal({source: o, target: o});
	      })
	      .remove();

	  // Stash the old positions for transition.
	  nodes.forEach(function(d) {
	    d.x0 = d.x;
	    d.y0 = d.y;
	  });
	}

	// Toggle children on click.
	function click(d) {
	  if (d.children) {
	    d._children = d.children;
	    d.children = null;
	  } else {
	    d.children = d._children;
	    d._children = null;
	  }
	  update(d);
	}

	function color(d) {
	  return d._children ? "#525353" : d.children ? "#525353" : "#e6d6bd";
	}

	function textcolor(d) {
	  return d._children ? "#ffffff" : d.children ? "#ffffff" : "#000000";
	}

	function textweight(d) {
	  return d._children ? "bold" : d.children ? "bold" : "normal";
	}




		  data.x0 = 0;
		  data.y0 = 0;
		  debugger;
		  var test = {
			  "name": "Zoo 1",
			  "children": [
			    {
			      "name": "Zookeeper 1",
			      "children": [
			        {
			          "name": "Exhibit 1",
			          "children": [
			            {
			              "name": "Species 1",
			              "children": [
			                {
			                  "name": "Animal 1"
			                },
			                {
			                  "name": "Animal 2"
			                }
			              ]
			            },
			            {
			              "name": "Species 2",
			              "children": [
			                {
			                  "name": "Animal 3"
			                },
			                {
			                  "name": "Animal 4"
			                },
			                {
			                  "name": "Animal 5"
			                }
			              ]
			            }
			          ]
			        },
			        {
			          "name": "Exhibit 2",
			          "children": [
			            {
			              "name": "Species 3",
			              "children": [
			                {
			                  "name": "Animal 6"
			                },
			                {
			                  "name": "Animal 7"
			                },
			                {
			                  "name": "Animal 8"
			                },
			                {
			                  "name": "Animal 9"
			                }
			              ]
			            }
			          ]
			        }
			      ]
			    },
			    {
			      "name": "Zookeeper 2",
			      "children": [
			        {
			          "name": "Exhibit 3",
			          "children": [
			            {
			              "name": "Species 4",
			              "children": [
			                {
			                  "name": "Animal 10"
			                },
			                {
			                  "name": "Animal 11"
			                },
			                {
			                  "name": "Animal 12"
			                },
			                {
			                  "name": "Animal 13"
			                },
			                {
			                  "name": "Animal 14"
			                }
			              ]
			            }
			          ]
			        }
			      ]
			    },
			    {
			      "name": "Zookeeper 3",
			      "children": [
			        {
			          "name": "Exhibit 4",
			          "children": [
			            {
			              "name": "Species 5",
			              "children": [
			                {
			                  "name": "Animal 15"
			                }
			              ]
			            },
			            {
			              "name": "Species 6",
			              "children": [
			                {
			                  "name": "Animal 16"
			                },
			                {
			                  "name": "Animal 17"
			                }
			              ]
			            },
			            {
			              "name": "Species 7",
			              "children": [
			                {
			                  "name": "Animal 18"
			                }
			              ]
			            }
			          ]
			        }
			      ]
			    }
			  ]
			};
		  update(test);
		  test.children.forEach(function(d) { click(d); });
		}
	});
});
