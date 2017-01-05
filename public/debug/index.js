let gpio = new Gpio();

gpio.emitter.on("input", (index, val) => {
    $(`#gpio-${index}`).html(val);
});
