// TEST: d3.json("data/data_min.json", readyHistory);
// async json api imports
var endpoint = "http://api.the-huck.com/gitcommits"
var url = endpoint + "?page=5"
var last_page;
d3.json(url, function(error, json) { // TODO: check
  if (error) return console.warn(error);
  last_page = Number(json._links.last.href.split('=')[1]);
  var q = queue();
  for (var p = 1; p <= last_page; p++) {
    url = endpoint
    if (p > 1) { url += "?page=" + p; }
    q = q.defer(d3.json, url) // TODO: check (double d3.json?)
  }
  //TODO: date sorting?
  q.awaitAll(readyHeatmap)
  q.awaitAll(readyLines)
  q.awaitAll(readyHistory)
});
