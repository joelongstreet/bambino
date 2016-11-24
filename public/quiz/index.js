let quiz = new Quiz(),
    win = new Win(),
    fail = new Fail(),
    gpio = new Gpio();

quiz.emitter.once("ready", () => quiz.loadQuestion());
win.emitter.on("done", () => quiz.loadQuestion());

gpio.emitter.on("input", (index) => {
    quiz.answer(index).then( result => {
        if(result.correct) win.show(result.index);
        else fail.show(result.index);
    });
});
