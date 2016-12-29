class Menu {
    constructor(selector){
        this.gpio = new Gpio();
        this.catalog = [];
        this.$el = $(selector);
        this.selectedIndex = 0;
        this.template = function(item){
            return `<div class="item" style="background-image:url(./assets/img/${item}.jpg)"></div>`;
        };

        this.gpio.emitter.on("input", index => {
            if(index === 0) this.navigate("-");
            else if(index === 3) this.navigate('+');
            else this.select();
        });
    }

    buildUi(){
        let width = this.catalog.length*100;
        this.$el.empty();
        this.$el.css("width", `${width}vw`);

        this.catalog.forEach(item => {
            this.$el.append(this.template(item));
        });
    }

    select(){
        window.location.href = `/${this.catalog[this.selectedIndex]}`;
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
