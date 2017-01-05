"use strict";

const path = require("path");

// acts as a filter for an array and will remove .DS_Store files
exports.filterDotFiles = i => {
    return i != ".DS_Store";
};


// used as an argument to map, prepends an array of paths to another path
exports.prependPath = (...root) => {
    return branch => {
        let tree = root.slice();
        tree.push(branch);
        return path.join.apply(null, tree);
    };
};
