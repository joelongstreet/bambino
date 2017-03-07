const startTimeAllowed = 3000,
    gpio = new Gpio({ timeoutSeconds: 20 });
    colors = ["red", "green", "yellow", "blue"];

let score,
    instruction,

    timeInterval = null,
    timeAllowed = startTimeAllowed,
    timeLeft = timeAllowed,

    $instruction = $('#instruction'),
    $timer = $('#timer'),
    $audio = $('audio'),
    $score = $('#score');

resetGame();

gpio.emitter.on("input", index => {
    if(timeLeft > 0){
        if(index === instruction){
            score++;
            loadInstruction();
        } else if(timeInterval){
            lose();
        }
    }
});


function loadInstruction(){
    resetTimer();
    let color = utils.random(colors);
    instruction = colors.indexOf(color);
    $instruction.css('backgroundColor', color);
    $audio[instruction].play();
}

function resetTimer(){
    clearInterval(timeInterval);

    if(timeAllowed > 100) timeAllowed -= 50;
    timeLeft = timeAllowed;
    timeInterval = setInterval(tick, 1);
}

function tick(){
    timeLeft -= 1;
    let time = timeLeft/timeAllowed;

    if(time <= 0){
        lose();
    } else {
        $timer.css('width', time*100 + '%');
    }
}

function lose(){
    timeLeft = 0;
    $audio[4].play();
    $instruction.css('backgroundColor', 'transparent');
    $score.text(score);
    $score.show();

    clearInterval(timeInterval);
    setTimeout(resetGame, 3000);
}

function resetGame(){
    $score.hide();
    timeAllowed = startTimeAllowed;
    score = 0;
    loadInstruction();
}
