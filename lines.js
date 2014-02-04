var margin = { top: 30, right: 0, bottom: 50, left: 30 };
var width = 960 - margin.left - margin.right;
var height = 430 - margin.top - margin.bottom;

// svg
var svg = d3.select("#chart2").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data.json", function(json) {
  var data = [];
  json._items.forEach(function(item) {
    var dt = new Date(item.datetime)
    data.push({ dt: dt, lines: item.lines })
  });
  console.log(data)
});
