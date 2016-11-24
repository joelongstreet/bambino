"use strict";

let gpio,
    io,
    inputs = [0, 1, 2, 3],
    outputs = [4, 5, 6, 7];

try{
    gpio = require("rpi-gpio");
} catch(e){}


module.exports = function(socketIo){
    io = socketIo;
    if(gpio) attachPins();
};


function attachPins(){
    inputs.forEach(pin => gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH));
    outputs.forEach(pin => gpio.open(pin, gpio.DIR_OUT));

    gpio.on("change", (pin, val) => {
        io.emit("gpio", {pin, val});
    });
}
