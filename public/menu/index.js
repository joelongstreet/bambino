let gpio = new Gpio(),
    catalog = [],
    $catalog = $("#catalog"),
    selectedIndex = 0;


fetch(
    new Request("/api/menu")
).then(response => {
    response.json().then(data => {
        catalog = utils.shuffle(data);
        buildUi();
    });
});


gpio.emitter.on("input", index => {
    if(index === 0) navigate("-");
    else if(index === 3) navigate('+');
    else select();
});


function buildUi(){
    let width = catalog.length*100;
    $catalog.css("width", `${width}vw`);

    catalog.forEach(item => {
        $catalog.append(
            `<div class="item" style="background-image:url(./assets/${item}.jpg)"></div>`
        );
    });
}

function select(){
    window.location.href = `/${catalog[selectedIndex]}`;
}

function navigate(direction){
    if(direction === "+" && selectedIndex < catalog.length - 1){
        selectedIndex ++;
    } else if(direction === "-" && selectedIndex > 0){
        selectedIndex --;
    }

    let position = (selectedIndex/catalog.length)*-100;
    $catalog.css("transform", `translateX(${position}%)`);
}
