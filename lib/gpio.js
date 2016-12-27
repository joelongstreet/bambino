"use strict";

let rpio,
    io,
    inputs = [29, 31, 33, 35],
    throttled = false;

try{
    rpio = require('rpio');
} catch(e){}


module.exports = (socketIo) => {
    io = socketIo;
    if(rpio){
        inputs.forEach(pin => {
            rpio.open(pin, rpio.INPUT, rpio.PULL_UP);
            rpio.poll(pin, poll);
        });
    }
};


function poll(pinNumber)
{
    if(!throttled){
        let val = rpio.read(pinNumber);
        let pin = inputs.indexOf(pinNumber);
        io.emit("gpio", { pin, val });
    }

    throttled = true;
    setTimeout(() => throttled = false, 50);
}
