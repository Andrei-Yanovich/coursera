var fs = require('fs');
var inversions = 0;

fs.readFile('./exercises/01.data', {encoding: 'UTF8'}, function(err, data) {
    var entries = data.split(/\n/).map(function(item) {
        return parseInt(item);
    });
    entries.pop();
    // mergeSort(entries);
    for (var i = 0; i < entries.length - 1; i++) {
        for (var j = i+1; j < entries.length; j++) {
            if (isNaN(entries[i]) || isNaN(entries[j])) { continue; }
            if (entries[i] > entries[j]) {
                console.log(entries[i], entries[j], '+++++++');
                inversions++;
            } else {console.log(entries[i], entries[j], '-----');}
        }
    }
    console.log('Inversions ==>', inversions);
});

// 2500464391 vs 2407905288 (correct)
function mergeSort (arr) {
    if (arr.length <= 1)
        return arr;
    var mid = arr.length / 2,
        left = arr.splice(0, mid),
        right = arr;
    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right);
}

function merge (left, right) {
    var results = [];
    left.push(Infinity);
    right.push(Infinity);
    while (left[0] !== Infinity || right[0] !== Infinity) {
        if (left[0] <= right[0]) {
            results.push(left.shift());
        } else {
            if (left[0] !== Infinity && right[0] !== Infinity)
                inversions += left.length - 1;
            results.push(right.shift());
        }
    }
    return results;
}
