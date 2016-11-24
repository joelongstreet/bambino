class Gpio{
    constructor(){
        this.socket = io('/');
        this.emitter = new EventEmitter2();

        document.addEventListener("keydown", e => {
            let index = (keyCode => {
                switch(keyCode) {
                    case 49: return 0;
                    case 50: return 1;
                    case 51: return 2;
                    case 52: return 3;
                    default: return false;
                }
            })(e.keyCode);

            if(index !== false) {
                this.emitter.emit("input", index);
            }
        });

        this.socket.on("gpio", d => {
            if(d.val == 1){
                this.emitter.emit("input", d.pin);
            }
        });
    }
}
