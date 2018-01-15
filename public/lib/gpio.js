class Gpio{
    constructor(opts){
        Object.assign(this, opts || {});
        this.scheduleTimeout();

        this.pinStatus = [0, 0, 0, 0, 0, 0, 0];
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
                this.scheduleTimeout();
            }
        });

        this.socket.on("gpio", d => {
            if(this.pinStatus[d.pin] != d.val){
                this.pinStatus[d.pin] = d.val;
				
                if(this.pinStatus.every(el => el == 1)){
                    this.goToMenu();
                }
                
                if(this.pinStatus[5] === 1) {
					this.goToMenu();
				}

                if(d.val == 1){
                    this.emitter.emit("input", d.pin);
                }

                this.scheduleTimeout();
                this.emitter.emit("update", d.pin, d.val);
            }
        });
    }

    scheduleTimeout(){
        if(this.timeoutSeconds){
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.goToMenu, this.timeoutSeconds*1000);
        }
    }

    goToMenu(){
        window.location.href = "/";
    }
}
