$(document).ready(function () {

	$.ajax({
		type: 'GET',
		url: '/search/api/'+$('#animalId').html(),
		success: function (data) {
			var width = 600,
			height = 300;

			var cluster = d3.layout.cluster()
			.size([height, width - 250]);

			var diagonal = d3.svg.diagonal()
			.projection(function(d) { return [d.y, d.x]; });

			var svg = d3.select(".profile-bottom .graph").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(150,0)");

			var test = {
			    "name": "Elephant Odyssey",
			    "children": [
			        {
			            "name": "California Condor",
			            "children": [
			                {
			                    "name": "Sisquoc",
			                    "icon": "http://i.imgur.com/RM0yxbY.jpg"
			                },
			                {
			                    "name": "Shatash",
			                    "icon": "http://i.imgur.com/lnLuWxR.jpg"
			                }
			            ]
			        }
			    ]
			};

			var nodes = cluster.nodes(data),
			links = cluster.links(nodes);

			var link = svg.selectAll(".link")
			.data(links)
			.enter().append("path")
			.attr("class", "link")
			.attr("d", diagonal);

			var node = svg.selectAll(".node")
			.data(nodes)
			.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

			node.append("circle")
			.attr("r", 4.5);

			node.append("image")
			.attr("xlink:href", function(d) { console.log(d.icon); return d.icon; })
			.attr("x", "8px")
			.attr("y", "3px")
			.attr("width", "60px")
			.attr("height", "60px");

			node.append("text")
			.append("svg:a").attr("xlink:href", function(d){ return "/animal/profile/" + d.id })
			.attr("dx", function(d) { return d.children ? -8 : 8; })
			.attr("dy", 3)
			.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
			.text(function(d) { return d.name; });

			d3.select(self.frameElement).style("height", height + "px");
		}
	});
});