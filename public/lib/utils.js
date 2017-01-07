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

    // gets a random object value or element from an array
    random (param) {
        if(typeof param === "number"){
            return Math.floor(Math.random() * (param - 1));
        } else if(param.length === undefined){
            let result,
                count = 0;

            for (var key in param)
                if (Math.random() < 1/++count)
                   result = param[key];
            return result;
        } else{
            return param[Math.floor(
                Math.random()*param.length
            )];
        }
    },

    // returns a file name without extension from a full path
    getFileNameFromPath (url) {
        let urlParts = url.split('/'),
            file = urlParts[urlParts.length - 1],
            fileName = file.split('.')[0];

        return fileName;
    }

};
