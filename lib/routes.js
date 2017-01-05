"use strict";

const path = require("path"),
    fs = require("fs"),
    utils = require("./utils"),
    cwd = process.env.cwd || process.cwd();


exports.sounds = (req, res) => {
    let sounds = path.join(cwd, "public/assets/sounds"),

    fail = fs.readdirSync(
        path.join(sounds, "fail")
    ).filter(utils.removeDotFiles),

    win = fs.readdirSync(
        path.join(sounds, "win")
    ).filter(utils.removeDotFiles);

    res.send({win, fail});
};


exports.signs = (req, res) => {
    let json = {};

    fs.readdirSync(
        path.join(cwd, "public/assets/signs")
    ).filter(utils.removeDotFiles).forEach(item => {
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
        ).filter(utils.removeDotFiles);

    categories.forEach(category => {
        let questions = [], answers = [];

        let files = fs.readdirSync(
            path.join(quizPath, category)
        ).filter(utils.removeDotFiles);

        files.forEach(file => {
            if(file === "_questions"){
                let qs = fs.readdirSync(
                    path.join(quizPath, category, file)
                ).filter(utils.removeDotFiles);

                questions = qs.map( q => {
                    return utils.createPublicUrlPath(
                        path.join(publicPath, category, "_questions", q)
                    );
                });
            } else {
                answers.push(
                    utils.createPublicUrlPath(
                        path.join(publicPath, category, file)
                    )
                );
            }
        });

        if(questions.length && answers.length)
            json[category] = {questions, answers};
    });

    res.send(json);
};
