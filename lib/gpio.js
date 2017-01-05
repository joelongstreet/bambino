"use strict";

let rpio,
    io,
    inputs = [29, 31, 33, 35];

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
    let val = rpio.read(pinNumber);
    let pin = inputs.indexOf(pinNumber);
    console.log("gpio", { pin, val });
    io.emit("gpio", { pin, val });
}
