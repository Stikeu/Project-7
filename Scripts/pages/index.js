import {
    recetteApi
} from "../api/api.js";
import {
    recetteFactory
} from "../factories/recetteFactory.js";
import {
    ingredientsFactory
} from "../factories/filterIngredientsFactory.js";

class indexTemplate {
    constructor() {
        this.recetteApi = new recetteApi()
        this.listRecette = []
    }
    displayRecette() {
        this.listRecette = this.recetteApi.getRecette();
        const recetteSection = document.querySelector(".recette_section");
        const ingredientsFilter = document.querySelector(".ingredientsFilter");
        this.listRecette.forEach((recette) => {
            const recetteModel = new recetteFactory(recette);
            const recetteFilter = new ingredientsFactory(recette);
            const filter = recetteFilter.getIngredientsMenu();
            const userCardDOM = recetteModel.getRecetteCardDOM();
            ingredientsFilter.appendChild(filter);
            recetteSection.appendChild(userCardDOM);
        });
    }

    searchByKey(key) {
        let recipesResult = [];
        for (let i = 0; i < this.listRecette.length; i++) {
            if (this.listRecette[i].name === key) {
                recipesResult.push(this.listRecette[i])
            }
            for (let j = 0; j < this.listRecette[i].ingredients.length; j++) {
                if (this.listRecette[i].ingredients[j].ingredient === key) {
                    recipesResult.push(this.listRecette[i]);
                }
            }
        }
    }
    async init() {
        this.displayRecette();
    }
}


const indextemplate = new indexTemplate();
indextemplate.init();