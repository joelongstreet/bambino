let gpio = new Gpio(),
    catalog,
    $video = $("#video"),
    $image = $("#image");


fetch(
    new Request("/api/signs")
).then(response => {
    response.json().then(data => {
        catalog = data;
        buildUi();
    });
});


gpio.emitter.on("input", () => {
    buildUi();
});


function buildUi(){
    let item = utils.random(catalog);
    $image.css("background-image", `url(${item.image})`);
    $video.attr("src", item.video);
}
