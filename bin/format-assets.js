"use strict";

let fs = require("fs"),
    path = require("path"),
    gm = require("gm"),
    ffmpeg = require("fluent-ffmpeg"),
    root = process.cwd();

const assetDirectories = [
    path.join(root, 'public/quiz', 'assets')
];


assetDirectories.forEach(dir => {
    let files = fs.readdirSync(dir),
        i = 0;

    function recurse(){
        if(!files[i]) process.exit();

        let extension = path.extname(files[i]),
            filePath = path.join(dir, files[i]);

        i++;

        if([".jpg", ".png"].includes(extension)){
            resizeImage(filePath, recurse);
        } else if([".mov"].includes(extension)){
            resizeVideo(filePath, recurse);
        } else recurse();
    }

    recurse();
});

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
