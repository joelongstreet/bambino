let quiz = new Quiz(),
    win = new Win(),
    fail = new Fail(),
    gpio = new Gpio({ timeoutSeconds: 20 }),
    confetti = new Confetti("confetti");

quiz.emitter.once("ready", () => quiz.loadQuestion());
win.emitter.on("done", () => quiz.loadQuestion());

gpio.emitter.on("input", index => {
    quiz.answer(index).then(result => {
        if(result.correct){
            quiz.pauseVideo();
            confetti.launch();
            win.show(result.index);
        } else {
            fail.show(result.index);
        }
    });
});
