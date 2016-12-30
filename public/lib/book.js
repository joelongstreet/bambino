class Book{

    constructor(currentBook){
        this.gpio = new Gpio();
        this.currentPage = 0;
        this.currentBook = currentBook;

        this.gpio.emitter.on("input", index => {
            if(index === 0 || index === 1) this.turnPage("-");
            else if(index === 2 || index === 3) this.turnPage("+");
        });

        this.loadPage(0);
    }

    turnPage(direction){
        if(direction === "+" && this.currentPage < this.currentBook.pages.length - 1){
            this.currentPage++;
        } else if(direction === "-" && this.currentPage > 0){
            this.currentPage--;
        }

        this.loadPage(this.currentPage);
    }

    loadPage(pageNumber){
        $("#page").html(
            this.currentBook.template(
                this.currentBook.pages[pageNumber]
            )
        );
    }
}
