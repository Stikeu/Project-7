function searchIngredientsDropdown() {
    let input = document.getElementById('inputIngredients').value;
    input = input.toLowerCase();
    let list = document.getElementsByClassName('ingredientsFilter');
    for (i = 0; i < list.length; i++) {
        if (!list[i].innerHTML.toLowerCase().includes(input)) {
            list[i].style.display = "none";
        }
    }
}

function searchAppreilsDropdown() {
    let input = document.getElementById('inputAppareils').value;
    input = input.toLowerCase();
    let list = document.getElementsByClassName('appareilsFilter');
    for (i = 0; i < list.length; i++) {
        if (!list[i].innerHTML.toLowerCase().includes(input)) {
            list[i].style.display = "none";
        }
    }
}

function searchUstensilesDropdown() {
    let input = document.getElementById('inputUstensiles').value;
    input = input.toLowerCase();
    let list = document.getElementsByClassName('ustensilesFilter');
    for (i = 0; i < list.length; i++) {
        if (!list[i].innerHTML.toLowerCase().includes(input)) {
            list[i].style.display = "none";
        }
    }
}