const inputUstensiles = document.getElementById('inputUstensiles');
const listUstensiles = document.getElementById("listUstensiles");


function searchIngredientsDropdown() {
    let input = document.getElementById('inputIngredients').value;
    input = input.toLowerCase();
    let list = document.getElementsByClassName('ingredientsFilter');
    //   list.style.display="list-item";
    for (i = 0; i < list.length; i++) {
        list[i].classList.remove('hidden')
        if (!list[i].innerHTML.toLowerCase().includes(input)) {
            list[i].style.display = "none";
        } else if (input.length == 0) {
            list[i].style.display = "none";
        } else {
            list[i].style.display = "list-item";
        }
    }
}

// utiliser add classlist hidden / remove hidden

function searchAppreilsDropdown() {
    let input = document.getElementById('inputAppareils').value;
    input = input.toLowerCase();
    let list = document.getElementsByClassName('appareilsFilter');
    for (i = 0; i < list.length; i++) {
        if (!list[i].innerHTML.toLowerCase().includes(input)) {
            list[i].style.display = "none";
        }
        // else {
        //     list[i].style.display="list-item";                 
        // }
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
        // else {
        //     list[i].style.display="list-item";                 
        // }

    }
}

inputUstensiles.addEventListener('keydown', function (e) {
    listUstensiles.style.display = "none"
})