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

    $audio.forEach($a => {
        $a.pause();
        $a.currentTime = 0;
    });

    let color = utils.random(colors);
    instruction = colors.indexOf(color);
    $instruction.css('backgroundColor', color);
    $audio[instruction].play();
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
    timeAllowed = startTimeAllowed;
    score = 0;
    loadInstruction();
}


function endGame(){
    $audio[4].play();
    $instruction.css('backgroundColor', 'transparent');
    $score.text(score);
    $score.show();

    timeLeft = 0;
    clearInterval(timeInterval);
    setTimeout(startGame, 3000);
}
