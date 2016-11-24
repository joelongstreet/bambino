const utils = {

    // shuffles an array and returns a shallow copy
    shuffle (arr) {
        let a = arr.slice(0);
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
        return a;
    },

    // gets a random element from an array
    random (arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    }

};
