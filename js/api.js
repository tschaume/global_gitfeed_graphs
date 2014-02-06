// spinner
var spinner = new Spinner({
  lines: 12, // The number of lines to draw
  length: 7, // The length of each line
  width: 5, // The line thickness
  radius: 10, // The radius of the inner circle
  color: '#000', // #rbg or #rrggbb
  speed: 1, // Rounds per second
  trail: 100, // Afterglow percentage
  shadow: true // Whether to render a shadow
}).spin(document.getElementById("navbar"));

// callback function to run all graphs
function readyAll(error, json) {
  if (error) return console.log(error);
  readyHeatmap(error, json);
  readyLines(error, json); //TODO: date sorting?
  readyHistory(error, json);
  spinner.stop();
}

// api call
// endpoint = "data/gitcommits.json" // test
endpoint = "http://api.the-huck.com/gitcommits" // production
d3.json(endpoint, readyAll);
