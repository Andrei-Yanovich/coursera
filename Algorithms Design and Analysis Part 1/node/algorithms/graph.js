var _ = require('lodash'),
    util = require('util');

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min+1) + min);
}

function Graph(nodes, edges) {
    this.nodes = nodes || [];
    this.edges = edges || {};
}

Graph.prototype.addNode = function (value, edges) {
    if (!this.edges[value]) {
        this.edges[value] = {};
        this.edges[value].__node = this.edges[value].__node || new Node(value, edges);
        this.nodes.push(this.edges[value].__node);
    }

    if (util.isArray(edges)) {
        // for arrays
        this.edges[value].edges = edges;
    } else {
        // for non-arrays
        this.edges[value].edges || (this.edges[value].edges = []);
        this.edges[value].edges.push(edges);
    }
};

Graph.prototype.getNode = function (value) {
    return (this.edges[value])
        ? this.edges[value].__node
        : undefined;
};

Graph.prototype.getEdgesFor = function (value) {
    return (this.edges[value])
        ? this.edges[value].edges
        : undefined;
};

Graph.prototype.getRandomEdge = function () {
    var i = getRandom(0, this.nodes.length-1),
        node = this.nodes[i],
        edges = this.getEdgesFor(node.value),
        r = getRandom(0, edges.length-1),
        edge = edges[r];
        nodeB = this.getNode(edge);

    return [node.value, nodeB.value];
};

Graph.prototype.clone = function() {
    var clone = _.clone(this);
    clone.edges = _.clone(this.edges);
    return clone;
};

Graph.prototype.transpose = function() {
    var orig = this,
        trans = orig.clone();
    trans.edges = {};

    _.each(Object.keys(orig.edges), function(val) {
        var edges = orig.getEdgesFor(val);
        _.each(edges, function(e) {
            // TODO: fix naive parseInt to handle any type of value
            trans.addNode(e, parseInt(val));
        });
    });

    return trans;
};

var _DFS_visit = function(graph, node) {
    graph._timer++;
    node.d = graph._timer;
    node.color = 'gray';
    _.each(graph.getEdgesFor(node.value), function(edge) {
        var v = graph.getNode(edge);
        if (v.color == 'white') {
            v.predecessor = node;
            _DFS_visit(graph, v);
        }
    });
    node.color = 'black';
    graph._timer++;
    node.f = graph._timer;
};

// take starting point?
Graph.prototype.DFS = function() {
    var G = this.clone();
    G._timer = 0;
    _.each(G.nodes, function(node) {
        node.color = 'white';
        node.predecessor = null;
    });

    _.each(G.nodes, function(node) {
        if (node.color == 'white') {
            _DFS_visit(G, node);
        }
    });

    return G;
};

Graph.prototype.DFSAlt = function() {
    var G = this.clone();
    G._timer = 0;
    _.each(G.nodes, function(node) {
        node.color = 'white';
        node.predecessor = null;
    });

    G.nodes.sort(function(a,b) { return b.f-a.f; });

    _.each(G.nodes, function(node) {
        if (node.color == 'white') {
            _DFS_visit(G, node);
        }
    });

    return G;
};

Graph.prototype.predecessorSubgraph = function() {
    _.each(this.nodes, function(node) {
        if (node.predecessor) {
            console.log('predecessor!', '[', node.predecessor.value, ',', node.value, ']');
        }
    });
    return this;
};

Graph.prototype.calculateSCCs = function() {
    // See page 617 of text for this
    // DFS(this) to compute finish times
    // T = this.transpose()
    var g = this.DFS().transpose().DFSAlt();
    // DFS(T) but in main loop consider vertices in order of decreasing finish time
    // output vertices of each tree in predecessor subgraph; this is the collection of SCC tress
    return g;
};


function Node(value, edges) {
    this.value = value;
}

exports.Graph = Graph;
exports.Node = Node;
