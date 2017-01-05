class Gpio{
    constructor(){
        this.pinStatus = [0, 0, 0, 0];
        this.socket = io('/');
        this.emitter = new EventEmitter2();
        this.throttled = false;

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
            if(!throttled){
                this.pinStatus[d.pin] = d.val;

                if(this.pinStatus.every(el => el == 1)){
                    window.location.href = "/menu";
                }

                if(d.val == 1){
                    this.emitter.emit("input", d.pin);
                }

                this.emitter.emit("update", d.pin, d.val);
            }

            this.throttled = true;
            setTimeout(() => throttled = false, 2000);
        });
    }
}
