var mathjs = require(mathjs);

var strassensMultiplication = function (matrixA, matrixB) {
    var sizeA = mathjs.size(matrixA), sizeB = mathjs.size(matrixB);

    if (!mathjs.isMatrix(matrixA) || !mathjs.isMatrix(matrixB) || !Array.isArray(matrixA) || !Array.isArray(matrixB) ||
        sizeA.length !== 2 || sizeB.length !== 2 || sizeA[0] !== sizeA[1] || sizeB[0] !== sizeB[1] || sizeA[0] !== sizeB[1]) {
        return new Error("Input params must be 2 dimensional quadratic matrix ");
    }



};

module.exports.strassensMultiplication = strassensMultiplication;