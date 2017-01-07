new Book({
    template: page => {
        return [
            `<div class='numbers page'>`,
                `<div class='number' style='background-image:url(/assets/numbers/${page}.jpg)'></div>`,
                `<audio autoplay>`,
                    `<source src='/assets/numbers/${page}.m4a' type='audio/mpeg'></source>`,
                `</audio>`,
            `</div>`
        ].join('');
    }
}).writePages(
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
);
