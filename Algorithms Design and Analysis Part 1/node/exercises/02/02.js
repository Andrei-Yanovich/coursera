"use strict";

var fs = require('fs'),
    quickSort = require('../../lib/quick-sort');

fs.readFile(__dirname + '/02.data', {encoding: 'UTF8'}, function(err, data) {
    var entries = data.split(/\n/).map(function(item) {
        return parseInt(item);
    });
    entries.pop();
    var len = entries.length,
        comparisons = quickSort(entries, 0, len-1),
        first = entries.slice(0, 5),
        last = entries.slice(len-5);

    console.log('total comparisons == ', comparisons, first, '...', last);
});
