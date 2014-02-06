// NOTE: change jsons -> json & comment jsons.forEach for single file test
function readyHistory(error, jsons) {
  if (error) return console.log(error);
  var aaData = [];
  jsons.forEach(function(json) {
    try {
      json._items.forEach(function(item) {
        if (item.sha1 == undefined) throw BreakException; // catch projects json
        var date = new Date(item.datetime)
        var hash = item.sha1.substring(0,6)
        var id = item.project.substring(0,6)
        var dateopts = {
          year: '2-digit', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute:'2-digit'
        }
        // TODO: get project name from project id
        // -> separate json request in api.js
        var commit = [
          date.toLocaleString('en-US', dateopts), id, item.message, hash
        ]
        aaData.push(commit);
      });
    } catch (e) {
      if (e != BreakException) throw e;
    }
  });
  $(document).ready(function() {
    $('#table').dataTable({"aaData": aaData});
  });
}
