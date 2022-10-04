class ingredientsFactory{
    constructor(data){
        this._ingredients = data.ingredients;
    }
    getIngredientsMenu(){
        const li = document.createElement("li");
        this._ingredients.forEach(ingredients => {
            li.innerHTML= ingredients.ingredient ;
            li.classList.add("dropdown-item");
        });
        return li;
    } 
}

export{
    ingredientsFactory
}