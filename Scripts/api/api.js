import recipes from "../../data/recipes.js";

class recetteApi {
    /**
     * 
     * @param {string} url 
     */
    constructor() {
        this._result = recipes;
    }

    getRecette() {
        return this._result
    }
}

export {
    recetteApi
}