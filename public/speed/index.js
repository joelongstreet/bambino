const gpio = new Gpio({ timeoutSeconds: null }),
    timer = new Timer(3000),
    colors = ["red", "green", "yellow", "blue"],
    confetti = new Confetti("confetti"),
    mode = new URL(window.location.href).searchParams.get('mode') || 'easy';

let score,
    instruction,
    $instruction = $('#instruction'),
    $instructionText = $('#instruction').find('.text'),
    $score = $('#score'),
    $hiScore = $('#hi-score'),
    $sound = {
        colors: $('audio.color'),
        win: $('audio.win')[0],
        lose: $('audio.lose')[0]
    };


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

    instruction = utils.random(colors.length + 1);

    let color = colors[instruction];

    if(mode === 'hard'){
        let textColor = utils.random(colors);

        $instructionText.text(color);
        $instructionText.css('color', textColor);
        $instruction.css('backgroundColor', utils.random(
            colors.filter(c => c !== textColor )
        ));
        utils.random($sound.colors).play();
    } else {
        $instruction.css('backgroundColor', color);
        $sound.colors[instruction].play();
    }
}


function startGame(){
    $score.hide(); $hiScore.hide();
    $score.text(''); $hiScore.text('');

    if(mode === 'hard'){
        $instructionText.show(); $instructionText.text('');
    }

    score = 0;
    timer.reset();
    loadInstruction();
}


function endGame(){
    $instruction.css('backgroundColor', 'transparent');
    $instructionText.hide();
    $score.text(score); $score.show();

    fetch(
        new Request(`/api/speed/${score}?mode=${mode}`)
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


startGame();
