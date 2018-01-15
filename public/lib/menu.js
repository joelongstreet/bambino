class Menu {
    constructor(selector){
        this.gpio = new Gpio();
        this.catalog = [];
        this.$el = $(selector);
        this.selectedIndex = 0;
        this.colorPalette = [ "#512DA8", "#303F9F", "#1976D2", "#0288D1",
        "#0097A7", "#00796B", "#388E3C", "#689F38", "#AFB42B", "#FBC02D",
        "#FFA000", "#F57C00", "#E64A19", "#5D4037", "#616161"];

        this.gpio.emitter.on("input", index => {
            if(index === 4) this.navigate("-");
            else if(index === 6) this.navigate('+');
            else if(index === 5) this.select(this.catalog[this.selectedIndex]);
        });
    }

    template(item){
        let charArray = Array.from(item.title).map(i => {
            if(utils.random([0, 1])) i = i.toUpperCase();
            return `<span style="color:${utils.random(this.colorPalette)}">${i}</span>`;
        });
        return `<div class="item"><h1>${charArray.join('')}</h1></div>`;
    }

    buildUi(){
        let width = this.catalog.length*100;
        this.$el.empty();
        this.$el.css("width", `${width}vw`);

        this.catalog.forEach(item => {
            this.$el.append(this.template(item));
        });
    }

    select(item){
        window.location.href = `/${item.route}`;
    }

    navigate(direction){
        if(direction === "+" && this.selectedIndex < this.catalog.length - 1){
            this.selectedIndex ++;
        } else if(direction === "-" && this.selectedIndex > 0){
            this.selectedIndex --;
        }

        let position = (this.selectedIndex/this.catalog.length)*-100;
        this.$el.css("transform", `translateX(${position}%)`);
    }
}
