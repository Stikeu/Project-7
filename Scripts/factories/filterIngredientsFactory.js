class ingredientsFactory{
    constructor(element){
        this._element= element;
        // this.tab = [];
        
    }
    getIngredientsMenu(){
        const li = document.createElement("li");
            li.innerHTML= this._element;
            li.classList.add("dropdown-item");
        return li;
    } 
}

export{
    ingredientsFactory
}


