class recetteFactory {
    constructor(data) {
        // Récupération des données 
        this._name = data.name;
        this._time = data.time;
        this._description = data.description;
        this._ingredients = data.ingredients;
        this._appliance = data.appliance;
        this._time = data.time
    }
    getRecetteCardDOM() {
        const card = document.createElement("div");
        const listIngredient = document.createElement("ul");
        card.innerHTML =
    `<img src="https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png" class="bd-placeholder-img card-img-top" alt="${this._name}">
    <div class="card-body">
        <div class="titleTime"> 
            <h5 class="card-title">${this._name}</h5>
            <p class="card-text">${this._time} min</p>
        </div>
        <div class="descprtionIngredient">
        <p class="card-text text-truncate">${this._description}</p>
        </div>
        </div>
    `;
        this._ingredients.forEach(ingredients => {
            const li = document.createElement("li");
            let unit = ingredients.unit ? ingredients.unit : "";
            let quantity = ingredients.quantity ? " : " + ingredients.quantity : "";
            li.innerHTML = ingredients.ingredient + quantity + unit;
            listIngredient.appendChild(li);
        });
        listIngredient.classList.add("listIngredientRecette")
        card.appendChild(listIngredient);
        card.classList.add("card");
        card.classList.add("g-col-4");
        card.classList.add("fullCard")
        return (card);
    }
}

export {
    recetteFactory
}