class Answer{
    constructor(){
        this.emitter = new EventEmitter2();
    }

    get(){
        return new Promise((resolve, reject) => {
            fetch(
                new Request("/api/sounds")
            ).then(response => {
                response.json().then(resolve);
            });
        });
    }

    template (prefix, path){
        return `<audio class=${prefix}><source src=${path}/></audio>`;
    }

    addSoundsToDom(prefix, assets){
        assets.forEach(asset => {
            $('#sounds').append(
                this.template(prefix, asset)
            );
        });

        this.$sounds = $(`audio.${prefix}`);
    }
}


class Win extends Answer{
    constructor(){
        super();
        this.get().then( d => {
            this.sounds = d.win;
            this.addSoundsToDom('win', this.sounds);
        });
    }

    show(index){
        utils.random(this.$sounds).play();
        var $el = $(`#answers .answer:nth-child(${index + 1})`);

        $("#answers").one(animation.eventDoneString, (e) => {
            $("#answers").removeClass(animation.removeAnimationString);
            this.emitter.emit("done");

            e.stopPropagation();
        });

        $el.one(animation.eventDoneString, (e) => {
            let klass = utils.random(animation.css.leave);
            $("#answers").addClass("animated " + klass);
            $el.removeClass(animation.removeAnimationString);

            e.stopPropagation();
        });

        let klass = utils.random(animation.css.win);
        $el.addClass("animated " + klass);
    }
}


class Fail extends Answer{
    constructor(){
        super();
        this.get().then( d => {
            this.sounds = d.fail;
            this.addSoundsToDom('fail', this.sounds);
        });
    }

    show(index) {
        utils.random(this.$sounds).play();
        var $el = $(`#answers .answer:nth-child(${index + 1})`);

        $el.one(animation.eventDoneString, (e) => {
            $el.removeClass(animation.removeAnimationString);
            this.emitter.emit("done");

            e.stopPropagation();
        });

        let klass = utils.random(animation.css.fail);
        $el.addClass("animated " + klass);
    }
}
