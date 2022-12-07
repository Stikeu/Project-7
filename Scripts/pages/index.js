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
        this.set_tag = new Set();
        this.userCardDOM = [];
        this.all_tag_ingredients = [];
        this.all_tag_appareils = [];
        this.all_tag_ustensiles = [];
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
            filter.classList.add("ingredientsFilterList")

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
            filter.classList.add("appareilsFilterList")
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
            filter.classList.add("ustensilesFilterList")
        })

    }

    allIngredients(recette, key) {
        for (let index = 0; index < recette.ingredients.length; index++) {
            if (recette.ingredients[index].ingredient.toLowerCase().includes(key)) {
                return recette
            }
        }
    }

    addtagTab() {
        const listIngredients = document.getElementsByClassName("ingredientsFilterList");
        const listAppareils = document.getElementsByClassName("appareilsFilterList");
        const listUstensiles = document.getElementsByClassName("ustensilesFilterList")
        for (let item of listIngredients) {
            item.addEventListener("click", e => {
                const valueIngredient = e.target.innerHTML.toLowerCase();
                if (!this.all_tag_ingredients.includes(valueIngredient)) {
                    this.all_tag_ingredients.push(valueIngredient);
                    console.log(this.all_tag_ingredients);
                    this.addtag(valueIngredient, 'blue', 'Ingredients');

                }
            })
        }
        for (let item of listAppareils) {
            item.addEventListener("click", e => {
                const valueAppareil = e.target.innerHTML.toLowerCase();
                if (!this.all_tag_appareils.includes(valueAppareil)) {
                    this.all_tag_appareils.push(valueAppareil);
                    console.log(this.all_tag_appareils);
                    this.addtag(valueAppareil, 'green', 'Appareils');

                }
            })
        }
        for (let item of listUstensiles) {
            item.addEventListener("click", e => {
                const valueUstensile = e.target.innerHTML.toLowerCase();
                if (!this.all_tag_ustensiles.includes(valueUstensile)) {
                    this.all_tag_ustensiles.push(valueUstensile);
                    console.log(this.all_tag_ustensiles);
                    this.addtag(valueUstensile, 'red', 'Ustensiles');

                }
            })
        }
    }

    addtag(name, color, zone) {
        const li = document.createElement("button");
        const ultag = document.getElementsByClassName("ulTag");
        li.innerHTML = name + '<i class="bi bi-x-circle closeTag"></i>';
        li.classList.add(`tag${zone}_${color}`);
        li.classList.add("activeTag");
        ultag[0].appendChild(li);
        this.suppTag();
    }

    

    suppTag() {
        const tagButton = document.querySelectorAll(".closeTag")
        tagButton.forEach(elt => elt.addEventListener("click", e => {    
        const tagTarget = e.target.parentNode.innerText;
        if(this.all_tag_appareils.includes(tagTarget) || this.all_tag_ingredients.includes(tagTarget) || this.all_tag_ustensiles.includes(tagTarget)) {
                console.log("dedans")
                this.all_tag_appareils.pop(tagTarget);
                this.all_tag_ingredients.pop(tagTarget);
                this.all_tag_ustensiles.pop(tagTarget);
                e.target.parentNode.style.display = 'none';
        }
        }))
    }
    displayByTag(listInput){
        const tagAppareils = this.all_tag_appareils;
        console.log(tagAppareils)
        if (tagAppareils.length >= 1) {
            console.log("in")
            var listResult = [];
            for (let i = 0; i < listInput.length; i++) {
                if (listInput[i].appliance.toLowerCase.includes(this.all_tag_appareils)) {
                    listResult.push(listInput[i]);
                }
                
            }
            
        }
    }
    searchByKey(listInput) {
        const searchInput = document.querySelector("[data-search]");
        searchInput.addEventListener("input", e => {
            const value = String(e.target.value).toLowerCase();
            if (value.length >= 3) {
                var listResult = [];
                console.log(listInput)
                for (let i = 0; i < listInput.length; i++) {
                    if (listInput[i].name.toLowerCase().includes(value) || listInput[i].description.toLowerCase().includes(value)) {
                        listResult.push(listInput[i]);
                    }
                    if (this.allIngredients(listInput[i], value) != null) {
                        listResult.push(listInput[i]);
                    }
                }
                document.querySelector('.recette_section').innerHTML = "";
                this.displayRecette(listResult)
                console.log(listResult);
            }
        })
    }

    // searchByKey(listInput){
    //     console.log(listInput)
    //     const searchInput = document.querySelector("[data-search]");
    //     searchInput.addEventListener("input", e => {
    //         const value = String (e.target.value).toLowerCase();
    //          if ( value.length >= 3 ) {
    //             console.log()
    //              var listResult = [];
    //              listResult = listInput.filter(elt => elt === value)
    //              console.log(listResult);
    //              document.querySelector('.recette_section').innerHTML = "";
    //              this.displayRecette(listResult)

    //          }
    //      })
    // }

    // récuperer recette input match

    async init() {
        var apiRecette = this.recetteApi.getRecette();
        this.displayRecette(apiRecette);
        this.displayFilter(apiRecette);
        this.displayFilterAppareils(apiRecette);
        this.displayFilterUstensiles(apiRecette);
        this.searchByKey(apiRecette);
        this.addtagTab(apiRecette);
        this.displayByTag(apiRecette);
    }
}


const indextemplate = new indexTemplate();
indextemplate.init();