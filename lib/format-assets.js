"use strict";

let fs = require("fs"),
    path = require("path"),
    gm = require("gm"),
    ffmpeg = require("fluent-ffmpeg"),
    root = process.cwd();

// define paths to format
const assetDirectories = [
    path.join(root, 'public/quiz', 'assets')
];

// gath files as a flat array
var files = [].concat.apply([],
    assetDirectories.map(dir => {
        return walkSync(dir);
    })
);


let i = 0;
recurse();
function recurse(){
    if(!files[i]) process.exit();

    let extension = path.extname(files[i]),
        file = files[i];

    i++;

    if([".jpg", ".png"].includes(extension)){
        resizeImage(file, recurse);
    } else if([".mov"].includes(extension)){
        resizeVideo(file, recurse);
    } else recurse();
}


function walkSync(dir, filelist) {
    let files = fs.readdirSync(dir);
    if(!filelist) filelist = [];

    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file, filelist);
        } else {
            if(file.charAt(0) != ".")
                filelist.push(path.join(dir, file));
        }
    });

    return filelist;
}


function resizeImage(imgPath, done){
    gm(imgPath).size((err, size) => {
        if(size.width > 1000){
            gm(imgPath).resize(1000)
                .write(imgPath, done);
        } else done();
    });
}


function resizeVideo(videoPath, done){
    let extension = path.extname(videoPath),
        tempPath = videoPath.replace(extension, `-temp${extension}` );

    ffmpeg(videoPath)
        .size('640x?')
        .aspect('16:9')
        .output(tempPath)
        .on("end", () => {
            fs.unlinkSync(videoPath);
            fs.renameSync(tempPath, videoPath);
            done();
        })
        .run();
}
