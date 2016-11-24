class Gpio{
    constructor(){
        this.emitter = new EventEmitter2();

        document.addEventListener("keydown", e => {
            let input = (keyCode => {
                switch(keyCode) {
                    case 49: return 0;
                    case 50: return 1;
                    case 51: return 2;
                    case 52: return 3;
                    default: return false;
                }
            })(e.keyCode);

            if(input !== false) {
                this.emitter.emit("input", input);
            }
        });
    }
}
