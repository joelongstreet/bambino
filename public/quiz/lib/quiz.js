class Quiz{
    constructor(){
        this.correctAnswerIndex = 0;
        this.emitter = new EventEmitter2();

        fetch(
            new Request("/api/quiz")
        ).then(response => {
            response.json().then(data => {
                this.questions = data;
                this.emitter.emit("ready");
            });
        });

        return this;
    }

    answer(index){
        let correct = false;
        if(index == this.correctAnswerIndex) correct = true;

        return new Promise((resolve, reject) => {
            resolve({correct, index});
        });
    }

    loadQuestion(){
        let section = utils.shuffle(this.questions)[0];
        $("#answers, #question").empty();

        let shuffledAnswers = utils.shuffle(section.answers);
        this.correctAnswerIndex = shuffledAnswers.indexOf(section.answers[0]);

        shuffledAnswers.forEach(answer => {
            $("#answers").append(
                templates.answer(answer)
            );
        });

        $("#question").append(
            templates.question(section.question)
        );
    }
}
