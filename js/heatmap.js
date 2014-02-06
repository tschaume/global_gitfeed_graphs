function readyHeatmap(error, jsons) {
  // extract data of interest from json api responses
  var raw_data = [];
  var dates = [];
  jsons.forEach(function(json) {
    json._items.forEach(function(item) {
      var dt = new Date(item.datetime)
      dates.push(dt);
      raw_data.push({ day: dt.getDay(), hour: dt.getHours() })
    });
  });
  // sort and count commits into days/hours
  var commits = {}
  raw_data.forEach(function(obj) {
    var key = JSON.stringify(obj)
    commits[key] = (commits[key] || 0) + 1
  });
  // generate data array of objects {day,hour,value}
  var data = [];
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 24; j++) {
      var key = JSON.stringify({ day: i, hour: j})
      data.push({ day: i, hour: j, commits: (commits[key] || 0)})
    }
  }
  // defs
  var margin = { top: 30, right: 0, bottom: 50, left: 30 };
  var width = 960 - margin.left - margin.right;
  var height = 430 - margin.top - margin.bottom;
  var gridSize = Math.floor(width/24);
  var legendElWidth = gridSize*2;
  var buckets = 9;
  var colors = colorbrewer.Reds[buckets];
  var days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  var hours = new Array(24);
  for (var j = 0; j < 24; j++) { hours[j] = j + "h"; }
  // svg
  var svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // day labels
  var dayLabels = svg.selectAll(".dayLabel")
  .data(days).enter().append("text")
  .text(function(d){return d;}).attr("x",0)
  .attr("y", function(d,i){return i*gridSize;})
  .style("text-anchor", "end")
  .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
  .attr("class", "dayLabel mono");
  // hour labels
  var hourLabels = svg.selectAll(".hourLabel")
  .data(hours).enter().append("text")
  .text(function(d){return d;}).attr("y",0)
  .attr("x", function(d,i){return i*gridSize;})
  .style("text-anchor", "middle")
  .attr("transform", "translate(" + gridSize / 2 + ", -6)")
  .attr("class", "hourLabel mono");
  // colorscale, number of commits & timeframe
  var maxCommits = d3.max(data, function(d){return d.commits;})
  var colorScale = d3.scale.quantile().domain([0, maxCommits]).range(colors)
  var nrCommits = d3.sum(data, function(d){return d.commits;})
  var timeframe = d3.extent(dates)
  // heatmap
  var heatMap = svg.selectAll(".hour").data(data).enter().append("rect")
  .attr("x", function(d){return d.hour*gridSize;})
  .attr("y", function(d){return d.day*gridSize;})
  .attr("width", gridSize).attr("height", gridSize)
  .attr("rx", 4).attr("ry", 4).attr("class", "hour bordered")
  .style("fill", colors[0])
  .transition().duration(1200)
  .style("fill", function(d){return colorScale(d.commits);});
  // legend
  var legend_data = [0].concat(colorScale.quantiles())
  var legend = svg.selectAll(".legend")
  .data(legend_data).enter().append("g")
  .attr("class", "legend")
  legend.append("rect")
  .attr("x", function(d,i){return legendElWidth*i;})
  .attr("y", height).attr("width", legendElWidth).attr("height", gridSize/2)
  .style("fill", function(d,i){return colors[i];});
  legend.append("text").attr("class", "mono")
  .text(function(d) { return "≥ " + Math.round(d); })
  .attr("x", function(d, i) { return legendElWidth * i; })
  .attr("y", height + gridSize);
  legend.append("text").attr("class", "mono")
  .text("total number of commits: " + nrCommits)
  .attr("x", 0).attr("y", height - gridSize/2)
  legend.append("text").attr("class", "mono")
  .text("timeframe: " + timeframe[0] + " - " + timeframe[1])
  .attr("x", 0).attr("y", height - gridSize)
}
