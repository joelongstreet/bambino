let gpio = new Gpio();

gpio.emitter.on("update", (index, val) => {
    $(`#gpio-${index}`).html(val);
});
