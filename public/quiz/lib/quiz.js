class Quiz{
    constructor(){
        this.correctAnswerIndex = 0;
        this.emitter = new EventEmitter2();

        fetch(
            new Request("/api/quiz")
        ).then(response => {
            response.json().then(data => {
                this.catalog = data;
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

    deriveAnswerFromQuestion(question, answers){
        let q = utils.getFileNameFromPath(question),
            answerPath;

        answers.forEach(function(a){
            if(utils.getFileNameFromPath(a) === q){
                answerPath = a;
            }
        });

        return answerPath;
    }


    choiceTemplate (path) {
        return `<div class="answer" style="background-image:url(${path})"></div>`;
    }

    questionTemplate (path) {
        return `<video autoplay loop><source src="${path}"/></video>`;
    }

    loadQuestion(){
        let category = utils.random(this.catalog),
            question = utils.random(category.questions),
            answer = this.deriveAnswerFromQuestion(question, category.answers),
            choices = utils.shuffle(category.answers).slice(0, 4);

        if(!choices.includes(answer)){
            choices.pop();
            choices.push(answer);
            choices = utils.shuffle(choices);
        }

        this.correctAnswerIndex = choices.indexOf(answer);

        $("#answers, #question").empty();

        choices.forEach(choice => {
            $("#answers").append(
                this.choiceTemplate(choice)
            );
        });

        $("#question").append(
            this.questionTemplate(question)
        );
    }

    pauseVideo(){
        $("#question").find("video")[0].pause();
    }
}
