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
        this.set = new Set();
        this.set_appreils = new Set();
        this.set_ustensiles = new Set();
        this.set_tag = new Set();
        this.userCardDOM = [];
        this.all_tag_ingredients = [];
        this.listResultIngredients = [];
        this.listResultAppareils = []
        this.listresultUstensils = []
        this.all_tag_appareils = [];
        this.all_tag_ustensiles = [];
        this.listRecette = this.recetteApi.getRecette();
        this.listResultAll = this.listRecette;
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
        console.log('here we are recettes', recettes)
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
                    this.addtag(valueIngredient, 'blue', 'Ingredients');

                }
            })
        }
        for (let item of listAppareils) {
            item.addEventListener("click", e => {
                const valueAppareil = e.target.innerHTML.toLowerCase();
                if (!this.all_tag_appareils.includes(valueAppareil)) {
                    this.all_tag_appareils.push(valueAppareil);
                    this.addtag(valueAppareil, 'green', 'Appareils');

                }
            })
        }
        for (let item of listUstensiles) {
            item.addEventListener("click", e => {
                const valueUstensile = e.target.innerHTML.toLowerCase();
                if (!this.all_tag_ustensiles.includes(valueUstensile)) {
                    this.all_tag_ustensiles.push(valueUstensile);
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
        this.displayByTag(this.listRecette)
    }

    getNewDropdownList(arr) {
        this.set = new Set();
        this.set_appreils = new Set();
        this.set_ustensiles = new Set()

        arr.forEach((elt) => {
            elt.ingredients.forEach((ing) => {
                this.set.add(ing.ingredient.toLowerCase());
            });
        });
        console.log(this.set)
        document.querySelector(".ingredientsFilter").innerHTML = "";
        document.querySelector(".appareilsFilter").innerHTML = "";
        document.querySelector(".ustensilesFilter").innerHTML = "";
        this.displayFilter(arr)
        this.displayFilterAppareils(arr);
        this.displayFilterUstensiles(arr)
    }

    suppTag() {
        const tagButton = document.querySelectorAll(".closeTag")
        tagButton.forEach(elt => elt.addEventListener("click", e => {
            const tagTarget = e.target.parentNode.innerText;
            if (this.all_tag_appareils.includes(tagTarget)) {
                console.log(tagTarget)
                this.all_tag_appareils = this.all_tag_appareils.filter((eltappareils) => eltappareils !== tagTarget);
                e.target.parentNode.style.display = 'none';
                this.displayByTag(this.listRecette)
                this.getNewDropdownList(this.listResultAppareils)
            }
            if (this.all_tag_ingredients.includes(tagTarget)) {
                console.log(tagTarget)
                this.all_tag_ingredients = this.all_tag_ingredients.filter((eltingreedients) => eltingreedients !== tagTarget);
                e.target.parentNode.style.display = 'none';
                this.displayByTag(this.listRecette)
                this.getNewDropdownList(this.listResultIngredients)
            }
            if (this.all_tag_ustensiles.includes(tagTarget)) {
                console.log(tagTarget)
                this.all_tag_ustensiles = this.all_tag_ustensiles.filter((eltustensiles) => eltustensiles !== tagTarget);
                e.target.parentNode.style.display = 'none';
                this.displayByTag(this.listRecette)
                this.getNewDropdownList(this.listresultUstensils);
            }
            if (this.all_tag_appareils.length === 0 && this.all_tag_ingredients.length === 0 && this.all_tag_ustensiles.length === 0) {
                document.querySelector('.recette_section').innerHTML = "";
                this.displayRecette(this.listRecette)
                this.getNewDropdownList(this.listRecette)
                this.addtagTab()
            }

        }))
    }

    displayByTag(listInput) {
        const tagAppareils = this.all_tag_appareils;
        const tagIngredients = this.all_tag_ingredients;
        const tagUstensiles = this.all_tag_ustensiles;
        var resultatsIntersection = []
        var tags = [...tagAppareils, ...tagIngredients, ...tagUstensiles];
        console.log(listInput)

        if (tags.length >= 1) {
            resultatsIntersection = listInput.filter(recipe => {
                    let ingredientsArray = [];
                    for (let key in recipe.ingredients) {
                        let ingredientElts = recipe.ingredients[key].ingredient.toLowerCase();
                        ingredientsArray.push(ingredientElts);
                    }
                    let appareilArray = recipe.appliance
                    let ustensilArray = recipe.ustensils
                    // console.log(ingredientsArray)
                    console.log(appareilArray)
                    console.log(tagAppareils)
                    // console.log(ustensilArray)
                    return tags.every(
                        tag => ingredientsArray.includes(tag.toLowerCase()) || appareilArray.includes(tag) || ustensilArray.includes(tag)
                    )
                });
                console.log(resultatsIntersection)
                console.log(tags)
        }



        // if (tagAppareils.length >= 1 || tagIngredients.length >= 1 || tagUstensiles.length >= 1) {
        // tagAppareils.forEach(appareil => {
        //         listInput.forEach(recette => {
        //             if (recette.appliance.toLowerCase().includes(appareil)) {
        //                 console.log("this.listResultIngredients")
        //                 this.listResultAppareils.push(recette)
        //             }
        //         })
        //     })
        //     document.querySelector('.recette_section').innerHTML = "";
        //     console.log(this.listResultAppareils)
        //     this.getNewDropdownList(this.listResultAppareils);
        //     this.addtagTab()
        // }
        // if (tagIngredients.length >= 1 || tagAppareils.length >= 1) {
        //     console.log(listInput)
        //     console.log("in Ingredients")
        //     console.log(tagIngredients)
        //     this.listResultIngredients = listInput.filter(recipe => {
        //         let ingredientsArray = [];
        //         for (let key in recipe.ingredients) {
        //             let ingredientElts = recipe.ingredients[key].ingredient.toLowerCase();
        //             ingredientsArray.push(ingredientElts);
        //         }
        //         return tagIngredients.every(
        //             tag => ingredientsArray.includes(tag.toLowerCase())
        //         )
        //     });
        //     document.querySelector('.recette_section').innerHTML = "";
        //     console.log(this.listResultIngredients)
        //     this.getNewDropdownList(this.listResultIngredients);
        //     this.addtagTab()
        // }
        // if (tagUstensiles.length >= 1) {
        //     console.log("in Ustensiles")
        //     console.log(tagUstensiles)
        //     listInput.forEach(recette => {
        //         recette.ustensils.filter(ust => {
        //             tagUstensiles.forEach(ustensil => {
        //                 if (ust.toLowerCase().includes(ustensil)) {
        //                     listResultUstensils.add(recette);
        //                 }
        //             })
        //         })
        //     })
        //     document.querySelector('.recette_section').innerHTML = "";
        //     console.log(listResultUstensils)
        //     this.getNewDropdownList(listResultUstensils);
        //     this.addtagTab()
        // }
        // this.listResultAll = new Set([...this.listResultAppareils, ...this.listResultIngredients, ...listResultUstensils]);
        // console.log(this.listResultAll)
        // this.displayRecette(this.listResultAll)

    }
    // searchByKey(listInput) {
    //     const searchInput = document.querySelector("[data-search]");
    //     searchInput.addEventListener("input", e => {
    //         const value = String(e.target.value).toLowerCase();
    //         if (value.length >= 3) {
    //             var listResult = [];
    //             console.log(listInput)
    //             for (let i = 0; i < listInput.length; i++) {
    //                 if (listInput[i].name.toLowerCase().includes(value) || listInput[i].description.toLowerCase().includes(value)) {
    //                     listResult.push(listInput[i]);
    //                 }
    //                 if (this.allIngredients(listInput[i], value) != null) {
    //                     listResult.push(listInput[i]);
    //                 }
    //             }
    //             document.querySelector('.recette_section').innerHTML = "";
    //             this.displayRecette(listResult)
    //             console.log(listResult);
    //         }
    //     })
    // }
    searchByKey(listInput) {
        const searchInput = document.querySelector("[data-search]");
        searchInput.addEventListener("input", e => {
            const value = String(e.target.value).toLowerCase();
            if (value.length >= 3) {
                var listResult = listInput.filter(item => {
                    return item.name.toLowerCase().includes(value) || item.description.toLowerCase().includes(value) || this.allIngredients(item, value) != null;
                });
                document.querySelector('.recette_section').innerHTML = "";
                this.displayRecette(listResult)
                console.log(listResult);
            }
        });
    }

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