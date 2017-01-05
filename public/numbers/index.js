var book = new Book(
    {
        title: "numbers",
        pages: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        template: page => {
            return [
                `<div class='numbers page'>`,
                    `<div class='number' style='background-image:url(/assets/numbers/${page}.jpg)'></div>`,
                    `<audio autoplay>`,
                        `<source src='/assets/numbers/${page}.mp3' type='audio/mpeg'></source>`,
                    `</audio>`,
                `</div>`
            ].join('');
        }
    }
);
