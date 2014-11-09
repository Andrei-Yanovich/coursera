var _ = require('lodash'),
    Graph = require('../../algorithms/graph').Graph,
    Node = require('../../algorithms/graph').Node;

function Contractor (graph) {
    this.graph = graph.clone();
    this.supernova = {};
};

Contractor.prototype._merge = function(edgeA, edgeB) {
    this.supernova[edgeA] || (this.supernova[edgeA] = []);
    this.supernova[edgeA].push(edgeB);
    if (this.supernova[edgeB]) {
        this.supernova[edgeA] = this.supernova[edgeA].concat(this.supernova[edgeB]);
        delete this.supernova[edgeB];
    }

    // remove merged node
    this.graph.nodes = _.reject(this.graph.nodes, function(item) {
        return item.value === edgeB;
    });

    var edgesA = this.graph.getEdgesFor(edgeA),
        edgesB = this.graph.getEdgesFor(edgeB),
        node = this.graph.getNode(edgeA);
    this.graph.edges[edgeA].edges = edgesB.concat(edgesA);
    delete this.graph.edges[edgeB];

    _.each(this.graph.edges, function(value, key, list) {
        // replace old node refs with new one
        var index = -1;
        while ((index = _.indexOf(value.edges, edgeB)) !== -1) {
            value.edges[index] = edgeA;
        }
        // remove self-loops
        value.edges = _.reject(value.edges, function(val) { return val == key; });
        list[key].edges = value.edges.sort(function(a, b) {return a-b;});
    });

    // return graph with the edge contracted into one node
};

Contractor.prototype.findCut = function() {
    while (this.graph.nodes.length > 2) {
        var edge = this.graph.getRandomEdge();
        this._merge(edge[0], edge[1]);
    }

    var totalCuts = _.max(
        this.graph.edges[this.graph.nodes[0].value].edges.length,
        this.graph.edges[this.graph.nodes[1].value].edges.length
    );

    return {
        graph: this.graph,
        cuts: totalCuts,
        merges: this.supernova
    };
};

exports.Graph = Graph;
exports.Contractor = Contractor;
