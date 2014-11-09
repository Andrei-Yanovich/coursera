var fs = require('fs'),
    readline = require('readline'),
    Graph = require('../../algorithm/graph').Graph,
    Contractor = require('../../algorithm/graph').Contractor,
    graph = new Graph(),
    _ = require('lodash');

var stream = fs.createReadStream(__dirname+'/data.txt'),
    input = readline.createInterface({
      input: stream,
      output: process.stdout,
      terminal: false
    });

input.on('line', function(line) {
  var data = line.trim().split(/\s+/),
      value = data.shift();

  graph.addNode(value, data);
});

input.on('close', function(data) {
    var i = 1000,
        results = [];
    while (i--) {
        var cut = new Contractor(graph).findCut();
        if (cut.cuts > 1) {
            // console.log(cut.cuts, cut.graph.nodes);
            results.push(cut.cuts);
        } else {
            length1 = cut.graph.edges[cut.graph.nodes[0].value];
            length2 = cut.graph.edges[cut.graph.nodes[1].value];
            console.log(cut.cuts, cut.graph.nodes[0], length1, cut.graph.nodes[1], length2);
        }
    };
    console.log("Min", _.min(results));
    console.log("Max", _.max(results));
});
