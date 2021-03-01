import * as localstorageData from './ls.js';

//variables to be used by the class
let pokedex;
let thisPage = 1;
const sw_url = 'https://pokeapi.co/api/v2/';

export default class pokedexList {
    constructor(elementID, category){
        this.key = elementID;
        this.parentElement = document.getElementById(elementID);
        this.backButton = this.buildBackButton();
        this.category = category;
        this.url = `${sw_url}${category}/?page=`;
    }

    init(){
        console.log(`initializing data`);
        fetch(`${this.url}${thisPage}`)
        .then(response => response.json())
        .then(data => {
            localstorageData.writeToLS(this.key, data);
            pokedex = [];
            data.results.forEach(element =>  {
                pokedex.push(newPokemon(element));
            })
            this.showFullList();
        });
    }
    showFullList(){
        const data = localstorageData.readFromLS(this.key);
        console.log(`showFullList initialized`);
        const container = this.parentElement;
        //clear the parent element
        container.innerHTML = '';
        //fill with the new list
        let pokedexSort = pokedex.sort();
        pokedexSort.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `${element.name}`;
            li.classList.add('names');
            li.classList.add('green');
            container.appendChild(li);
        })
        this.backButton.classList.add('hide');
        this.addListeners();
        this.buildPagination(data);
    }
    addListeners() {
        // get all 'li' children of the 'ul' element and attach a listener to each
        const listArr = Array.from(this.parentElement.children);
        console.log(listArr);
        listArr.forEach(item => {
            item.addEventListener('click', event => {
            this.showOneItem(event.currentTarget.innerText);
            })
        })
    }
    getItemByName(itemName) {
        return pokedex.find(item => item.name === itemName);
    }
    showOneItem(itemName){
        console.log(`showOneItem: ${itemName}`);
        const item = this.getItemByName(itemName);
        //this.parentElement.appendChild(renderOneItemFull(item));
        //clear the parent element and build a back button
        this.parentElement.innerHTML = '';

        const li = document.createElement('li');
        li.classList.add('full-detail');
        li.innerHTML = `
            <h2>${item.name}</h2>
            <ul id="details">
                <li>URL: ${item.url}</li>
            </ul>`;

        this.parentElement.appendChild(li);
        this.backButton.classList.remove('hide');
        document.getElementById('pages').classList.add('hide');
    }
    buildPagination(data){
        console.log(`building pagination`)
        const lastPage = Math.ceil(data.count / 10);
        console.log(lastPage);

        const listArr = Array.from(document.getElementById('pages').children);
        console.log(listArr);
        listArr.forEach(item => {
            item.onclick = (event) => {
                if(event.currentTarget.id == 'first'){
                    console.log('heading to First page');
                    if(thisPage != 1){
                        thisPage = 1;
                        this.init();
                    }  
                } else if (event.currentTarget.id == 'previous'){
                    console.log('heading to Previous page');
                    if(thisPage !=1){
                        thisPage -= 1;
                        this.init();
                    }
                }
                else if (event.currentTarget.id == 'next'){
                    console.log('heading to Next page');
                    if(thisPage != lastPage){
                        thisPage += 1;
                        this.init();
                    }
                }
                else if (event.currentTarget.id == 'last'){
                    console.log('heading to Last page');
                    if(thisPage != lastPage){
                        thisPage = lastPage;
                        this.init();
                    }
                }
            }
        })
        document.getElementById('pages').classList.remove('hide');
    }

    buildBackButton(){
        const backButton = document.createElement("button");
        backButton.textContent = "Return to List";
        backButton.onclick = () => {this.showFullList();};
        backButton.classList.add('back-button');
        this.parentElement.after(backButton);
        return backButton;
    }
}

function newPokemon(pokemon){
    
    const newPokemon = {
        name: pokemon.name,
        url: pokemon.url,
    }
    return newPokemon;
}