const gpio = new Gpio({ timeoutSeconds: null }),
    timer = new Timer(3000),
    colors = ["red", "green", "yellow", "blue"],
    confetti = new Confetti("confetti");

let score,
    instruction,
    $instruction = $('#instruction'),
    $score = $('#score'),
    $hiScore = $('#hi-score'),
    $sound = {
        colors: $('audio.color'),
        win: $('audio.win')[0],
        lose: $('audio.lose')[0]
    };

startGame();

timer.emitter.on('expired', endGame);
gpio.emitter.on("input", index => {
    if(timer.valid){
        if(index === instruction){
            score += timer.getPercentComplete();
            loadInstruction();
        } else{
            timer.expire();
        }
    }
});


function loadInstruction(){
    timer.decrement();

    $sound.colors.forEach($a => {
        $a.pause();
        $a.currentTime = 0;
    });

    let color = utils.random(colors);
    instruction = colors.indexOf(color);
    $instruction.css('backgroundColor', color);
    $sound.colors[instruction].play();
}


function startGame(){
    $score.hide(); $hiScore.hide();
    $score.text(''); $hiScore.text('');

    score = 0;
    timer.reset();
    loadInstruction();
}


function endGame(){
    $instruction.css('backgroundColor', 'transparent');
    $score.text(score); $score.show();

    fetch(
        new Request(`/api/speed/${score}`)
    ).then(response => {
        if(response.status === 201){
            $sound.win.play();
            confetti.launch();
        } else {
            $sound.lose.play();
            response.json().then(data => {
                $hiScore.text(`High Score: ${data}`);
                $hiScore.show();
            });
        }
    });

    setTimeout(startGame, 3000);
}
