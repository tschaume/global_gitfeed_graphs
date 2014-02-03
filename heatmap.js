var buckets = 9;
var colors = colorbrewer.YlGnBu[buckets];
var width = 960, height = 430;
var gridSize = Math.floor(width/24);
var days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
var hours = new Array(24);
for (var j = 0; j < 24; j++) { hours[j] = j + "h"; }

d3.json("data.json", function(error, json) {
  if (error) return console.warn(error);
  // extract data of interest from json api response
  var raw_data = new Array(json._items.length);
  json._items.forEach(function(item) {
    var dt = new Date(item.datetime)
    raw_data.push({ day: days[dt.getDay()], hour: hours[dt.getHours()] })
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
  var data = new Array(days.length*hours.length);
  for (var i = 0; i < days.length; i++) {
    for (var j = 0; j < hours.length; j++) {
      var key = JSON.stringify({ day: days[i], hour: hours[j]})
      data.push({ day: days[i], hour: hours[j], commits: commits[key] })
    }
  }
  console.log(data)
  //var maxCommits = d3.max(data, function(d){return d.value;})
  //console.log(maxCommits)
  //var colorScale = d3.scale.quantile()
  //.domain([0, buckets-1, maxCommits]).range(colors)
  //var svg = d3.select("#chart").append("svg")
  //.attr("width", width).attr("height", height).append("g")
  //var heatMap = svg.selectAll(".hour")
  //.data(data).enter().append("rect")
  //.attr("x", function(d,i){return i*gridSize;})
  //.attr("y", function(d,i){return i*gridSize;})
  //.attr("width", gridSize).attr("height", gridSize)
  //.attr("rx", 4).attr("ry", 4).attr("class", "hour bordered")
});
