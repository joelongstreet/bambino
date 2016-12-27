let quiz = new Quiz(),
    win = new Win(),
    fail = new Fail(),
    gpio = new Gpio(),
    throttled = false;

quiz.emitter.once("ready", () => quiz.loadQuestion());
win.emitter.on("done", () => quiz.loadQuestion());

gpio.emitter.on("input", index => {
    if(!throttled){
        quiz.answer(index).then(result => {
            if(result.correct){
                quiz.pauseVideo();
                win.show(result.index);
            } else {
                fail.show(result.index);
            }
        });
    }

    throttled = true;
    setTimeout(() => throttled = false, 1000);
});
