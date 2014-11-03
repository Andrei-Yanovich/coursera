"use strict";

function QuickSorter (arr, pivotStrategy) {
    this.arr = arr;
    this.setPivotStrategy(pivotStrategy);
}

QuickSorter.prototype.setPivotStrategy = function(strategy) {
    this.pivotStrategy = this.pivotStrategies.choose(strategy);
};

QuickSorter.prototype.sort = function(start, end) {
    if (start == null) start = 0;
    if (end == null) end = this.arr.length-1;
    var comparisons = 0;

    if (Number.isNaN(start) || Number.isNaN(end))
        throw new Error('Invalid start/end');

    if (end > start) {
        comparisons += end - start;

        this._setPivot(this.arr, start, end);
        var p = this._partition(start, end);
        comparisons += this.sort(start, p-1);
        comparisons += this.sort(p+1, end);
    }

    return comparisons;
};

QuickSorter.prototype._partition = function (start, end) {
    var i = start + 1,
        pivot = this.arr[start];
    for (var j = start + 1; j <= end; j++) {
        if (this.arr[j] < pivot) {
            this._swap(i, j);
            i++;
        }
    }
    this._swap(start, i-1);
    return i-1;
};

QuickSorter.prototype._setPivot = function(arr, start, end) {
    this.pivotStrategy(arr, start, end);
};

QuickSorter.prototype.pivotStrategies = {
    last: function last (arr, start, end) {
        this._swap(start, end);
    },
    median: function median (arr, start, end) {
        var mid = start + parseInt((end - start) / 2);
        var _median = [arr[start], arr[mid], arr[end]].sort(this._integerComparitor)[1];
        var chosen = (arr[start] == _median) ? start : (arr[end] == _median) ? end : mid;
        this._swap(start, chosen);
    },
    first: function first () {
        // default, no-op
    },
    choose: function choose (type) {
        return this[type] || this.first;
    }
};

QuickSorter.prototype._swap = function (a, b) {
    var tmp = this.arr[a];
    this.arr[a] = this.arr[b];
    this.arr[b] = tmp;
};

QuickSorter.prototype._integerComparitor = function (a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
};

module.exports = QuickSorter;
