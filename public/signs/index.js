let book = new Book({
    shuffle  : true,
    template : (page, i) => {
        return [
            "<video autoplay loop id='video'>",
                `<source src="${page.media}"></source>`,
            "</video>",
            `<div id="image" style="background-image:url(${page.image})"></div>`
        ].join('');
    }
});


fetch(
    new Request("/api/book/signs")
).then(response => {
    response.json().then(data => {
        let pages = [];
        for(let key in data) {
            pages.push(data[key]);
        }
        book.writePages(pages);
    });
});
