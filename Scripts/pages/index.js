import {
    recetteApi
} from "../api/api.js";
import {
    recetteFactory
} from "../factories/recetteFactory.js";

class indexTemplate {
    constructor() {
        this.recetteApi = new recetteApi("../data/recipes.js")
    }
    async displayRecette() {
        const listRecette = await this.recetteApi.getRecette();
        const recetteSection = document.querySelector(".recette_section");

        listRecette.forEach((recette) => {
            const recetteModel = new recetteFactory(recette);
            const userCardDOM = recetteModel.getRecetteCardDOM();
            recetteSection.appendChild(userCardDOM);
        });
    }
    async init() {
        this.displayRecette();
    }
}


const indextemplate = new indexTemplate();
indextemplate.displayRecette();