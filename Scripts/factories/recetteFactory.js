class recetteFactory{
    constructor(data){
    // Récupération des données 
    this._name = data.name;
    this._time = data.time;
    this._description = data.description;
}
getRecetteCardDOM(){
    const card = document.createElement("div");

    card.innerHTML= 
    `<img src="#" class="card-img-top" alt="${this._name}"
    <div class="card-body">
    <h5 class="card-title">${this._name}</h5>
    <p class="card-text">${this._description}</p>
    `;
    return (card);
}
}

export {
    recetteFactory
}