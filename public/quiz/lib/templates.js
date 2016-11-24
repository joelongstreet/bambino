const templates = {
    assetsPath: './assets/',

    answer (asset) {
        let path = this.assetsPath + asset;
        return `<div class="element fourth answer" style="background-image:url(${path})"></div>`;
    },

    question (asset) {
        if(asset.title){
            return `<h1>${asset.title}</h1>`;
        } else {
            let path = this.assetsPath + asset;
            return `<video autoplay loop><source src="${path}"/></video>`;
        }
    }
};
