// global BreakException to catch projects json
var BreakException= {};

// test single json input file
//d3.json("data/gitcommits0.json", readyHistory);

// callback function to run all graphs
function readyAll(error, jsons) {
  if (error) return console.log(error);
  readyHeatmap(error, jsons);
  readyLines(error, jsons); //TODO: date sorting?
  readyHistory(error, jsons);
}

// init queue and get projects
var q = queue()
var projects = "data/gitprojects.json"
q = q.defer(d3.json, projects)

// test multiple json input files
var url = "data/gitcommits"
for (var p = 0; p < 3; p++) {
  var endpoint = url + p + ".json"
  q = q.defer(d3.json, endpoint)
}

// async json api imports
// TODO: get projects
//var url = "http://api.the-huck.com/gitcommits"
////TODO: last_page from first api request with endpoint = url
////var last_page = Number(json._links.last.href.split('=')[1]);
//var last_page = 10;
//for (var p = 2; p <= last_page; p++) {
//  endpoint = url + "?page=" + p;
//  q = q.defer(d3.json, endpoint)
//}

// call all graphs after requests finished
q.awaitAll(readyAll)
