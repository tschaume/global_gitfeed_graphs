// callback function to run all graphs
function readyAll(error, json) {
  if (error) return console.log(error);
  readyHeatmap(error, json);
  readyLines(error, json); //TODO: date sorting?
  readyHistory(error, json);
}

// test single json input file
// TODO: take live with api.the-huck.com
d3.json("data/gitcommits.json", readyAll);
