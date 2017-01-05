"use strict";

let fs = require("fs"),
    path = require("path"),
    gm = require("gm"),
    ffmpeg = require("fluent-ffmpeg"),
    root = process.cwd();

// define paths to format
const assetDirectories = [
    path.join(root, 'public/assets')
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
    } else if([".mov", ".MOV"].includes(extension)){
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
            console.log(`Resizing Image: ${imgPath}`);
            gm(imgPath).resize(1000)
                .write(imgPath, done);
        } else done();
    });
}


function resizeVideo(videoPath, done){
    if(videoPath.includes(".mp4")){
        done();
    } else {
        console.log(`Resizing Video: ${videoPath}`);
        let tempPath = videoPath.replace(
                path.extname(videoPath), "-temp.mp4"
            ),
            newPath = videoPath.replace(
                path.extname(videoPath), ".mp4"
            );

        ffmpeg(videoPath)
            .size('640x?')
            .output(tempPath)
            .on("end", () => {
                fs.unlinkSync(videoPath);
                fs.renameSync(tempPath, newPath);
                done();
            })
            .run();
    }
}
