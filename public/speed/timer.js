class Timer{
    constructor(initialTimeAllowed){
        this.valid = true;
        this.initialTimeAllowed = initialTimeAllowed;
        this.timeInterval = null;
        this.timeAllowed = this.initialTimeAllowed;
        this.timeLeft = this.timeAllowed;

        this.emitter = new EventEmitter2();

        this.$el = $('#timer');
    }

    decrement(){
        clearInterval(this.timeInterval);

        if(this.timeAllowed > 100) this.timeAllowed -= 50;
        this.timeLeft = this.timeAllowed;
        this.timeInterval = setInterval(() => {
            this.tick();
        }, 1);
    }

    tick(){
        this.timeLeft -= 1;

        if(this.timeLeft <= 0){
            this.expire();
        } else{
            this.$el.css('width', `${(this.timeLeft/this.timeAllowed)*100}%`);
        }
    }

    expire(){
        this.valid = false;
        clearInterval(this.timeInterval);
        this.emitter.emit('expired');
    }

    reset(){
        this.valid = true;
        clearInterval(this.timeInterval);
        this.timeAllowed = this.initialTimeAllowed;
    }

    getPercentComplete(){
        return Math.round(
            (this.timeLeft/this.timeAllowed)*100
        );
    }
}
