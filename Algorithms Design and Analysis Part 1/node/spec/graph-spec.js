var pkg = require('../algorithms/graph'),
    Graph = pkg.Graph,
    Node = pkg.Node,
    util = require('util');

describe("Graph", function() {
    describe("with all edges for node added at once", function() {
        var graph = null;
        beforeEach(function() {
            graph = new Graph();
            graph.addNode('a', ['b']);
            graph.addNode('b', ['c', 'f', 'e']);
        });

        describe("#addNode", function() {
            it("should add a new node entry", function() {
                expect(graph.nodes.length).toEqual(2);
            });

            it("should have only the 2 nodes we added", function() {
                expect(graph.getNode('a')).toEqual({value: 'a'});
            });

            it("should add edges for each node", function() {
                expect(graph.getEdgesFor('a')).toEqual(['b']);
                expect(graph.getEdgesFor('b')).toEqual(['c', 'f', 'e']);
            });
        });
    });

    describe("with edges for node's added one at a time", function() {
        var graph = null;
        beforeEach(function() {
            graph = new Graph();
            graph.addNode('a', 'b');
            graph.addNode('b', 'c');
            graph.addNode('b', 'f');
            graph.addNode('b', 'e');
        });

        describe("#addNode", function() {
            it("should add a new node entry", function() {
                expect(graph.nodes.length).toEqual(2);
            });

            it("should have only the 2 nodes we added", function() {
                expect(graph.getNode('a')).toEqual({value: 'a'});
            });

            it("should add edges for each node", function() {
                expect(graph.getEdgesFor('a')).toEqual(['b']);
                expect(graph.getEdgesFor('b')).toEqual(['c', 'f', 'e']);
            });
        });
    });

    describe("with test sample data", function() {
        var graph = null,
            g = null;
        beforeEach(function() {
            graph = new Graph();
            graph.addNode(1, 2);
            graph.addNode(1, 4);
            graph.addNode(2, 3);
            graph.addNode(3, 4);
            graph.addNode(4, 2);
            graph.addNode(5, 3);
            graph.addNode(5, 6);
            graph.addNode(6, 6);
            g = graph.DFS();
        });

        describe("#transpose", function() {
            it("should reverse (transpose) all edges", function() {
                var gT = graph.transpose();
                expect(gT.getEdgesFor(1)).toBeUndefined();
                expect(gT.getEdgesFor(2)).toEqual([1,4]);
                expect(gT.getEdgesFor(3)).toEqual([2,5]);
                expect(gT.getEdgesFor(4)).toEqual([1,3]);
                expect(gT.getEdgesFor(5)).toBeUndefined();
                expect(gT.getEdgesFor(6)).toEqual([5,6]);
            });
        });

        describe("#DFS", function() {
            it("should mark nodes with their depth", function() {
                expect(g.getNode(1).d).toEqual(1);
                expect(g.getNode(2).d).toEqual(2);
                expect(g.getNode(3).d).toEqual(3);
                expect(g.getNode(4).d).toEqual(4);
                expect(g.getNode(5).d).toEqual(9);
                expect(g.getNode(6).d).toEqual(10);
            });

            it("should mark nodes with their finish time", function() {
                expect(g.getNode(1).f).toEqual(8);
                expect(g.getNode(2).f).toEqual(7);
                expect(g.getNode(3).f).toEqual(6);
                expect(g.getNode(4).f).toEqual(5);
                expect(g.getNode(5).f).toEqual(12);
                expect(g.getNode(6).f).toEqual(11);
            });
        });
    });

    describe("Strongly Connected Components", function() {
        var graph = null;
        beforeEach(function() {
            graph = new Graph();
            graph.addNode(1, 2);
            graph.addNode(2, 3);
            graph.addNode(2, 6);
            graph.addNode(2, 5);
            graph.addNode(3, 4);
            graph.addNode(3, 7);
            graph.addNode(4, 3);
            graph.addNode(4, 8);
            graph.addNode(5, 1);
            graph.addNode(5, 6);
            graph.addNode(6, 7);
            graph.addNode(7, 6);
            graph.addNode(7, 8);
            graph.addNode(8, 8);
        });
        // var graph = null,
        //     g = null;
        // beforeEach(function() {
        //     graph = new Graph();
        //     graph.addNode(1, 2);
        //     graph.addNode(1, 4);
        //     graph.addNode(2, 3);
        //     graph.addNode(3, 4);
        //     graph.addNode(4, 2);
        //     graph.addNode(5, 3);
        //     graph.addNode(5, 6);
        //     graph.addNode(6, 6);
        // });

        it("should identify SCC's", function() {
            // (u, v), (v, y), (y, x), (w, z)
            // (1, 2), (2, 3), (3, 4), (5, 6)
            // [1, 2], [2, 3], [3, 4], [5, 6]
            // [5, 2], [1, 5], [7, 6], [3, 4]
            // var result = graph.calculateSCCs();
            console.log(util.inspect(graph.calculateSCCs().predecessorSubgraph(), {depth: 3}));
            // expect(result.length).toEqual(4);
            // expect(result[0].nodes).toEqual([1,2,5]);
            // expect(result[1].nodes).toEqual([3,4]);
            // expect(result[2].nodes).toEqual([6,7]);
            // expect(result[0].nodes).toEqual([8]);
        });
    });
});
