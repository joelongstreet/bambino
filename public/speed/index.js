const startTimeAllowed = 3000,
    gpio = new Gpio({ timeoutSeconds: null }),
    colors = ["red", "green", "yellow", "blue"],
    confetti = new Confetti("confetti");

let score,
    instruction,

    timeInterval = null,
    timeAllowed = startTimeAllowed,
    timeLeft = timeAllowed,

    $instruction = $('#instruction'),
    $timer = $('#timer'),
    $score = $('#score'),
    $hiScore = $('#hi-score'),
    $sound = {
        colors: $('audio.color'),
        win: $('audio.win')[0],
        lose: $('audio.lose')[0]
    };


startGame();

gpio.emitter.on("input", index => {
    if(timeLeft > 0){
        if(index === instruction){
            score += Math.round(
                (timeLeft/timeAllowed)*100
            );
            loadInstruction();
        } else{
            endGame();
        }
    }
});


function loadInstruction(){
    clearInterval(timeInterval);
    if(timeAllowed > 100) timeAllowed -= 50;
    timeLeft = timeAllowed;
    timeInterval = setInterval(tick, 1);

    $sound.colors.forEach($a => {
        $a.pause();
        $a.currentTime = 0;
    });

    let color = utils.random(colors);
    instruction = colors.indexOf(color);
    $instruction.css('backgroundColor', color);
    $sound.colors[instruction].play();
}


function tick(){
    timeLeft -= 1;
    let time = timeLeft/timeAllowed;

    if(time <= 0){
        endGame();
    } else{
        $timer.css('width', time*100 + '%');
    }
}


function startGame(){
    $score.hide();
    $score.text('');
    $hiScore.hide();
    $hiScore.text('');

    timeAllowed = startTimeAllowed;
    score = 0;
    loadInstruction();
}


function endGame(){
    $instruction.css('backgroundColor', 'transparent');
    $score.text(score);
    $score.show();

    fetch(
        new Request(`/api/speed/${score}`)
    ).then(response => {
        if(response.status === 201){
            $sound.win.play();
            confetti.launch();
        } else {
            $sound.lose.play();
            response.json().then(data => {
                $hiScore.show();
                $hiScore.text(`High Score: ${data}`);
            });
        }
    });

    timeLeft = 0;
    clearInterval(timeInterval);
    setTimeout(startGame, 3000);
}
