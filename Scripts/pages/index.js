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
        this.recetteApi = new recetteApi();
        this.listRecette = [];
        this.set = new Set();
        this.set_appreils = new Set();
        this.set_ustensiles = new Set();
        this.userCardDOM = [];
    }

    displayRecette() {
        this.listRecette = this.recetteApi.getRecette();
        
        const recetteSection = document.querySelector(".recette_section");
        this.listRecette.forEach((recette) => {
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
            })
            
    }

    searchByKey(){
        const searchInput = document.querySelector("[data-search]");
        searchInput.addEventListener("input", e => {
           const value = String (e.target.value).toLowerCase();
            if ( value.length >= 3 ) {
                // console.log(this.listRecette);
                var listResult = [];
                for (let i = 0; i < this.listRecette.length; i++) {
                    console.log(value)
                    if (this.listRecette[i].name.toLowerCase().includes(value) || this.listRecette[i].description.toLowerCase().includes(value)) {
                        listResult.push(this.listRecette[i]);
                   } 
                }
                console.log(listResult);
            }
        })
    }
    // recherche ingredients et elimination duplication et affichage et avancer fiche
    // searchByKey(key) {
    //     let recipesResult = [];
    //     for (let i = 0; i < this.listRecette.length; i++) {
    //         if (this.listRecette[i].name === key) {
    //             recipesResult.push(this.listRecette[i])
    //         }
    //         for (let j = 0; j < this.listRecette[i].ingredients.length; j++) {
    //             if (this.listRecette[i].ingredients[j].ingredient === key) {
    //                 recipesResult.push(this.listRecette[i]);
    //             }
    //         }
    //     }
    // }
    
    // récuperer recette input match

    async init() {
        var apiRecette = this.recetteApi.getRecette();
        this.displayRecette();
        this.displayFilter(apiRecette);
        this.displayFilterAppareils(apiRecette);
        this.displayFilterUstensiles(apiRecette);
        this.searchByKey();
    }
}


const indextemplate = new indexTemplate();
indextemplate.init();