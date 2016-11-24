"use strict";

let path = require("path"),
    fs = require("fs");


exports.sounds = (req, res) => {
    let sounds = path.join(process.cwd(), "/public/assets/sounds"),

    fail = fs.readdirSync(
        path.join(sounds, "fail")
    ).filter(removeDotFiles),

    win = fs.readdirSync(
        path.join(sounds, "win")
    ).filter(removeDotFiles);

    res.send({win, fail});
};


exports.quiz = (req, res) => {
    res.send(require("./quiz"));
};


function removeDotFiles(i){
    return i != ".DS_Store";
}
