"use strict";

let path = require("path");

// acts as a filter for an array and will remove .DS_Store files
exports.removeDotFiles = function(i){
    return i != ".DS_Store";
};


// takes an absolute path (eg. /Users/joe.longstreet/.../public/assets/item.jpg)
// and transforms it into a web path (eg. /assets/item.jpg)
exports.createPublicUrlPath = function(p){
    return p.replace(path.join(process.cwd(), 'public'), "");
};
