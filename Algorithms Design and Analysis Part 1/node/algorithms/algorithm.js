var strassens = require("./strassens_miltiplication"),
    quickSort = require("./quick_sort"),
    quickSorterFunc = function (arr) {
        new quickSort(arr).sort()
        return arr;
    };


module.exports = {
    strassensMultiplication: strassens,
    quickSort: quickSorterFunc
};