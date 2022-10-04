class ingredientsFactory{
    constructor(data){
        this._ingredients = data.ingredients;
    }
    getIngredientsMenu(){
        const listIngredient = document.createElement("ul");
        this._ingredients.forEach(ingredients => {
            const li = document.createElement("li");
            li.innerHTML= ingredients.ingredient;
            li.classList.add("dropdown-item");
            listIngredient.appendChild(li);
        });
        listIngredient.classList.add("dropdown-menu");
        return(listIngredient);
    } 
}

export{
    ingredientsFactory
}