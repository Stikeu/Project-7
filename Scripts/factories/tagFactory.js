class tagFactory{
    constructor(element){
        this._element= element;
    }
    createTag(){
        const li = document.createElement("li");
        li.innerHTML= this._element;
        return li
    }
}
export {
    tagFactory
}