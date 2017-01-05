"use strict";

const path = require("path"),
    fs = require("fs"),
    utils = require("./utils"),
    cwd = process.env.cwd || process.cwd();


exports.sounds = (req, res) => {
    let sounds = path.join(cwd, "public/assets/sounds"),
    publicPath = "/assets/sounds",

    fail = fs.readdirSync(path.join(sounds, "fail"))
        .filter(utils.filterDotFiles)
        .map(utils.prependPath(publicPath, "fail")),

    win = fs.readdirSync(path.join(sounds, "win"))
        .filter(utils.filterDotFiles)
        .map(utils.prependPath(publicPath, "win"));

    res.send({win, fail});
};


exports.signs = (req, res) => {
    let json = {};

    fs.readdirSync(
        path.join(cwd, "public/assets/signs")
    ).filter(utils.filterDotFiles).forEach(item => {
        let extension = path.extname(item);
        let name = item.replace(extension, "");
        if(!json[name]) json[name] = {};

        let type = "video";
        if(!extension.toLowerCase().includes(".mp4")) type = "image";

        json[name][type] = path.join("/assets/signs/", item);
    });

    for(let key in json){
        if(json[key].image === undefined || json[key].video === undefined){
            delete json[key];
        }
    }

    res.send(json);
};


exports.quiz = (req, res) => {
    let json = {},
        quizPath = path.join(cwd, "public/assets/quiz"),
        publicPath = "/assets/quiz",
        categories = fs.readdirSync(
            path.join(quizPath)
        ).filter(utils.filterDotFiles);

    categories.forEach(category => {
        let questions = [], answers = [];

        let files = fs.readdirSync(
            path.join(quizPath, category)
        ).filter(utils.filterDotFiles);

        files.forEach(file => {
            if(file === "_questions"){
                questions = fs.readdirSync(
                    path.join(quizPath, category, file)
                ).filter(utils.filterDotFiles)
                .map(utils.prependPath(publicPath, category, "_questions"));
            } else {
                answers.push(
                    path.join(publicPath, category, file)
                );
            }
        });

        if(questions.length && answers.length)
            json[category] = {questions, answers};
    });

    res.send(json);
};
