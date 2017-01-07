new Book({
    template: page => {
        return [
            `<div class='alphabet page'>`,
                `<div class='letter' style='background-image:url(/assets/alphabet/${page}.jpg)'></div>`,
                `<div class='example' style='background-image:url(/assets/alphabet/${page}-img.jpg)'></div>`,
                `<audio autoplay>`,
                    `<source src='/assets/alphabet/${page}.m4a' type='audio/mpeg'></source>`,
                `</audio>`,
            `</div>`
        ].join('');
    }
}).writePages([
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]);
