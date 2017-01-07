let book = new Book({
    shuffle  : true,
    template : (page, i) => {
        return [
            "<audio loop autoplay>",
                `<source src="${page.media}"></source>`,
            "</audio>",
            `<div class="animal" style="background-image:url(${page.image})"></div>`
        ].join('');
    }
});


fetch(
    new Request("/api/book/animals")
).then(response => {
    response.json().then(data => {
        let pages = [];
        for(let key in data) {
            pages.push(data[key]);
        }
        book.writePages(pages);
    });
});
