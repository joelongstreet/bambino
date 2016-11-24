// Validates the quiz definition file to check for proper formatting
// and existence of all assets

var assert = require("assert"),
    fs = require("fs"),
    path = require("path"),
    quiz = require("../lib/quiz");

const ASSET_PATH = path.join(process.cwd(), "/public/quiz/assets/");

describe("Questions and Answers", () => {
    it("should require a title for questions which don't have a video defined", () => {
        quiz.forEach(set => {
            if(typeof set.question == "object"){
                assert(set.question.title !== undefined);
            }
        });
    });

    it("should have 4 answers for each question", () => {
        quiz.forEach(set => {
            assert.equal(set.answers.length, 4);
        });
    });

    it("should validate the existence of an asset for a question if an asset url is defined", () => {
        quiz.forEach(set => {
            if(typeof set.question != "object"){
                fs.lstatSync(`${ASSET_PATH}${set.question}`);
            } else if(typeof set.question == "object"){
                if(set.question.audio){
                    fs.lstatSync(`${ASSET_PATH}${set.question.audio}`);
                }
            }
        });
    });

    it("should validate the existence of an asset for each answer", () => {
        quiz.forEach(set => {
            set.answers.forEach(answer => {
                fs.lstatSync(`${ASSET_PATH}${answer}`);
            });
        });
    });
});
