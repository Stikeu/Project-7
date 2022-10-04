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
        this.listRecette.forEach((recette) => {
            const recetteModel = new recetteFactory(recette);
            const userCardDOM = recetteModel.getRecetteCardDOM();
            recetteSection.appendChild(userCardDOM);
        });
    }

    displayFilter(){
        this.listRecette = this.recetteApi.getRecette();
        console.log(this.listRecette)
        const ingredientsFilter = document.querySelector(".filterIngredients");
        this.listRecette.forEach((recette) => {
            const recetteModel = new ingredientsFactory(recette);
            const userCardDOM = recetteModel.getIngredientsMenu();
            ingredientsFilter.appendChild(userCardDOM);
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
        this.displayFilter();
    }
}


const indextemplate = new indexTemplate();
indextemplate.init();