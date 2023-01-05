const inputUstensiles = document.getElementById('inputUstensiles');
const listUstensiles = document.getElementById("listUstensiles");


function searchIngredientsDropdown() {
    let input = document.getElementById('inputIngredients').value;
    input = input.toLowerCase();
    let list = document.getElementsByClassName('ingredientsFilterList');
    //   list.style.display="list-item";
    for (i = 0; i < list.length; i++) {
        if (!list[i].innerHTML.toLowerCase().includes(input)) {
            console.log('ingredient In ')
            list[i].style.display = "none";
        } else if (input.length == 0) {
            list[i].style.display = "block";
        } else if (input.length >= 1) {
            list[i].style.display = "list-item";
            console.log(list[i].innerHTML)
        }
    }
}

// utiliser add classlist hidden / remove hidden

function searchAppreilsDropdown() {
    let input = document.getElementById('inputAppareils').value;
    input = input.toLowerCase();
    let list = document.getElementsByClassName('appareilsFilterList');
    for (i = 0; i < list.length; i++) {
        if (!list[i].innerHTML.toLowerCase().includes(input)) {
            list[i].style.display = "none";
        } else if (input.length == 0) {
            list[i].style.display = "block";
        } else if (input.length >= 1) {
            list[i].style.display = "list-item";
        }
    }

}

function searchUstensilesDropdown() {
    let input = document.getElementById('inputUstensiles').value;
    input = input.toLowerCase();
    let list = document.getElementsByClassName('ustensilesFilterList');
    for (i = 0; i < list.length; i++) {
        if (!list[i].innerHTML.toLowerCase().includes(input)) {
            list[i].style.display = "none";
        } else if (input.length == 0) {
            list[i].style.display = "block";
        } else if (input.length >= 1) {
            list[i].style.display = "list-item";
            console.log(list[i].innerHTML)
        }

    }
}