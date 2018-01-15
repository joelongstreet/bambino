"use strict";

const inputs = [35, 33, 31, 29, 40, 38, 36];

let rpio,
    io;

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
