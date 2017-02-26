class Book{

    constructor(options){
        if(!options) options = {};

        this.shuffle = options.shuffle || false;
        this.template = options.template || function(){};

        this.currentPage = 0;
        this.gpio = new Gpio({ timeoutSeconds: 20 });
        this.emitter = new EventEmitter2();

        this.gpio.emitter.on("input", index => {
            if(index === 0 || index === 1)
                this.turnPage("-");
            else if(index === 2 || index === 3)
                this.turnPage("+");
        });

        return this;
    }

    writePages(pages){
        this.pages = pages;

        if(this.shuffle){
            this.currentPage = utils.random(
                this.pages.length - 1
            );
        }

        this.loadPage(this.currentPage);
    }

    turnPage(direction){
        if(this.shuffle){
            this.currentPage = utils.random(
                this.pages.length - 1
            );
        } else {
            if(direction === "+" && this.currentPage < this.pages.length - 1){
                this.currentPage++;
            } else if(direction === "-" && this.currentPage > 0){
                this.currentPage--;
            }
        }

        this.loadPage(this.currentPage);
    }

    loadPage(pageNumber){
        $("#page").html(
            this.template(
                this.pages[pageNumber],
                pageNumber
            )
        );

        this.emitter.emit("page", this.currentPage);
    }
}
