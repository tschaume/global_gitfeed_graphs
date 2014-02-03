var buckets = 9;
var colors = colorbrewer.YlGnBu[buckets];
var width = 960, height = 300;
var gridSize = Math.floor(width/24);

d3.json("data.json", function(error, json) {
  if (error) return console.warn(error);
  // extract data of interest from json api response
  var raw_data = new Array(json._items.length);
  json._items.forEach(function(item) {
    var dt = new Date(item.datetime)
    raw_data.push({ day: dt.getDay(), hour: dt.getHours() })
  });
  console.log(raw_data)
  // sort and count commits into days/hours
  var commits = {}
  raw_data.forEach(function(obj) {
    var key = JSON.stringify(obj)
    commits[key] = (commits[key] || 0) + 1
  });
  console.log(commits);
  // generate data array of objects {day,hour,value}
  var data = [];
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 24; j++) {
      var key = JSON.stringify({ day: i, hour: j})
      data.push({ day: i, hour: j, commits: (commits[key] || 0)})
    }
  }
  console.log(data)
  // start heatmap
  var maxCommits = d3.max(data, function(d){return d.commits;})
  var colorScale = d3.scale.quantile().domain([0, buckets-1, maxCommits]).range(colors)
  var svg = d3.select("#chart").append("svg")
  .attr("width", width).attr("height", height).append("g")
  var heatMap = svg.selectAll(".hour").data(data).enter().append("rect")
  .attr("x", function(d){return d.hour*gridSize;})
  .attr("y", function(d){return d.day*gridSize;})
  .attr("width", gridSize).attr("height", gridSize)
  .attr("rx", 4).attr("ry", 4).attr("class", "hour bordered")
  .style("fill", colors[0]);
  heatMap.transition().duration(1000)
  .style("fill", function(d){return colorScale(d.commits);});
});
