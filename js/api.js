// callback function to run all graphs
function readyAll(error, json) {
  if (error) return console.log(error);
  readyHeatmap(error, json);
  readyLines(error, json); //TODO: date sorting?
  readyHistory(error, json);
}

// api call
// endpoint = "data/gitcommits.json" // test
endpoint = "http://api.the-huck.com/gitcommits" // production
d3.json(endpoint, readyAll);
