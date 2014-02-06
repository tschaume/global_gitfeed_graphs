function readyHistory(error, json) {
  if (error) return console.log(error);
  var aaData = [];
  var projects = {};
  json._items.forEach(function(item) {
    var date = new Date(item.datetime)
    var hash = item.sha1.substring(0,6)
    var dateopts = {
      year: '2-digit', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute:'2-digit'
    }
    var commit = [
      date.toLocaleString('en-US', dateopts),
      item.project, item.message, hash
    ]
    aaData.push(commit);
  });
  // DataTable
  $(document).ready(function() {
    $('#table').dataTable({"aaData": aaData});
  });
}
