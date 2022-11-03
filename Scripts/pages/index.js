import {
    recetteApi
} from "../api/api.js";
import {
    recetteFactory
} from "../factories/recetteFactory.js";
import {
    ingredientsFactory
} from "../factories/filterIngredientsFactory.js";
const recetteSection = document.querySelector(".recette_section");

class indexTemplate {
    constructor() {
        this.recetteApi = new recetteApi();
        this.listRecette = [];
        this.set = new Set();
        this.set_ingredients = new Set();
        this.set_appreils = new Set();
        this.set_ustensiles = new Set();
        this.userCardDOM = [];
    }

   
    displayRecette(listResult) {
        listResult.forEach((recette) => {
            const recetteModel = new recetteFactory(recette);
            this.userCardDOM = recetteModel.getRecetteCardDOM();
            recetteSection.appendChild(this.userCardDOM);
        });
    }
    
    displayFilter(recettes) {
        const ingredientsFilter = document.querySelector(".ingredientsFilter");
        recettes.forEach(recette => {
            recette.ingredients.forEach(ingredients => {
                this.set.add(ingredients.ingredient.toLowerCase());
            })
        });
        this.set.forEach(element => {
            const recetteFilter = new ingredientsFactory(element);
            const filter = recetteFilter.getIngredientsMenu();
            ingredientsFilter.appendChild(filter);
            filter.classList.add("ingredientsFilter")

        })
    }

    displayFilterAppareils(recettes) {
        const appareilsFilter = document.querySelector(".appareilsFilter");
        recettes.forEach(recette => {
            this.set_appreils.add(recette.appliance.toLowerCase());
        });
        this.set_appreils.forEach(element => {
            const recetteFilter = new ingredientsFactory(element);
            const filter = recetteFilter.getIngredientsMenu();
            appareilsFilter.appendChild(filter);
            filter.classList.add("appareilsFilter")
        })
        
    }

    displayFilterUstensiles(recettes) {
        const ustensilesFilter = document.querySelector(".ustensilesFilter");
        recettes.forEach(recette => {
            recette.ustensils.forEach(ustensils => {
                this.set_ustensiles.add(ustensils.toLowerCase());
            })
        });
            this.set_ustensiles.forEach(element => {
                const recetteFilter = new ingredientsFactory(element);
                const filter = recetteFilter.getIngredientsMenu();
                ustensilesFilter.appendChild(filter);
                filter.classList.add("ustensilesFilter")
            })
            
    }

   async allIngredients(recettes){
        recettes.forEach(recette => {
            recette.ingredients.forEach(ingredients => {
                this.set_ingredients.add(ingredients.ingredient.toLowerCase());
            })
        });
    }
    
  async  searchByKey(listInput){
        const searchInput = document.querySelector("[data-search]");
        const allingredient = await this.set_ingredients;
        console.log(allingredient)
        console.log(listInput)
        searchInput.addEventListener("input", e => {
           const value = String (e.target.value).toLowerCase();
            if ( value.length >= 3 ) {
                var listResult = [];
                for (let i = 0; i < listInput.length; i++) {
                    if (listInput[i].name.toLowerCase().includes(value) || listInput[i].description.toLowerCase().includes(value) || allingredient.toLowerCase().includes(value) ) {
                        listResult.push(listInput[i]);
                   } 
                }
                document.querySelector('.recette_section').innerHTML = "";
                this.displayRecette(listResult)
                console.log(listResult);
            }
        })
    }

    // récuperer recette input match

    async init() {
        var apiRecette = this.recetteApi.getRecette();
        this.displayRecette(apiRecette);
        this.displayFilter(apiRecette);
        this.displayFilterAppareils(apiRecette);
        this.displayFilterUstensiles(apiRecette);
        this.searchByKey(apiRecette);
    }
}


const indextemplate = new indexTemplate();
indextemplate.init();