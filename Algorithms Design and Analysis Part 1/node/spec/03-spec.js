var pkg = require('../exercises/03/contractor'),
    Contractor = pkg.Contractor,
    Graph = pkg.Graph;

describe('Contractor', function() {
    it('should be a function', function() {
        expect(typeof Contractor).toEqual('function');
    });

    describe("#merge", function() {
        it("should return a graph", function() {
            var g = new Graph();
            g.addNode(1, [2,3]);
            g.addNode(2, [1,3,4]);
            g.addNode(3, [1,2,4]);
            g.addNode(4, [2,3]);
            var c = new Contractor(g);
            expect(c.graph.nodes.length).toEqual(4);
            c._merge(1, 3);
            expect(c.graph.nodes.length).toEqual(3);
            expect(c.graph.getNode(1).value).toEqual(1);
            expect(c.graph.getEdgesFor(1)).toEqual([2,2,4]);
            expect(c.graph.getEdgesFor(2)).toEqual([1,1,4]);
            expect(c.graph.getEdgesFor(4)).toEqual([1,2]);
            c._merge(1, 2);
            expect(c.graph.getEdgesFor(1)).toEqual([4,4]);
            expect(c.graph.getEdgesFor(4)).toEqual([1,1]);
        });

        it("should merge edges together", function() {
            var g = new Graph();
            g.addNode(1, [2,3]);
            g.addNode(2, [1,3,4]);
            g.addNode(3, [1,2,4]);
            g.addNode(4, [2,3]);
            var c = new Contractor(g);
            c._merge(1, 2);
            expect(c.graph.getEdgesFor(1)).toEqual([3,3,4]);
            expect(c.graph.getNode(2)).not.toBeDefined();
            expect(c.graph.getEdgesFor(2)).not.toBeDefined();
        });

        it("should replace references to merged node", function() {
            var g = new Graph();
            g.addNode(1, [2,3]);
            g.addNode(2, [1,3,4]);
            g.addNode(3, [1,2,4]);
            g.addNode(4, [2,3]);
            var c = new Contractor(g);
            c._merge(1, 2);
            expect(c.graph.getEdgesFor(4)).toEqual([1,3]);
            expect(c.graph.getEdgesFor(3)).toEqual([1,1,4]);
        });

        it("should keep track of merges", function() {
            var g = new Graph();
            g.addNode(1, [2,3]);
            g.addNode(2, [1,3,4]);
            g.addNode(3, [1,2,4]);
            g.addNode(4, [2,3]);
            var c = new Contractor(g);
            c._merge(1,2);
            expect(c.supernova).toEqual({1: [2]});
            c._merge(1,3);
            expect(c.supernova).toEqual({1: [2,3]});
            var g = new Graph();
            g.addNode(1, [2,3]);
            g.addNode(2, [1,3,4]);
            g.addNode(3, [1,2,4]);
            g.addNode(4, [2,3]);
            var c = new Contractor(g);
            c._merge(1,2);
            expect(c.supernova).toEqual({1: [2]});
            c._merge(4,3);
            expect(c.supernova).toEqual({1: [2], 4: [3]});
        });
    });

describe('#findCut', function() {
    it("should return 2 nodes", function() {
        var g = new Graph();
        g.addNode(1, [2,3]);
        g.addNode(2, [1,3,4]);
        g.addNode(3, [1,2,4]);
        g.addNode(4, [2,3]);
        var c = new Contractor(g);
        var result = c.findCut();
        expect(result.graph.nodes.length).toEqual(2);
    });

    it("should leave the original graph object untouched", function() {
        var g = new Graph();
        g.addNode(1, [2,3]);
        g.addNode(2, [1,3,4]);
        g.addNode(3, [1,2,4]);
        g.addNode(4, [2,3]);
        var c = new Contractor(g);
        var result = c.findCut();
        expect(result.graph).not.toEqual(g);
    });
});
});
