function readyLines(error, jsons) {
  var data = [];
  var lines = 0;
  // TODO: ordering!
  jsons.forEach(function(json) {
    try {
      json._items.forEach(function(item) {
        if (item.sha1 == undefined) throw BreakException; // catch projects json
        var dt = new Date(item.datetime)
        if (item.lines > 2000) { console.log(item); }
        else {
          lines += item.lines;
          var obj = { date: dt, lines: lines };
          data.push(obj);
        }
      });
    } catch (e) {
      if (e != BreakException) throw e;
    }
  });
  // defs
  var margin = { top: 30, right: 0, bottom: 50, left: 100 };
  var width = 960 - margin.left - margin.right;
  var height = 430 - margin.top - margin.bottom;
  // svg
  var svg = d3.select("#chart2").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // axes
  var x = d3.time.scale().range([0, width])
  var y = d3.scale.linear().range([height, 0])
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).orient("left");
  var line = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.lines); });
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.lines; }));
  svg.append("g").attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")").call(xAxis);
  svg.append("g").attr("class", "y axis").call(yAxis)
  .append("text").attr("transform", "rotate(-90)")
  .attr("y", 6).attr("dy", ".71em").style("text-anchor", "end")
  .text("#lines changed");
  // line
  svg.append("path").datum(data).attr("class", "line").attr("d",line);
}
