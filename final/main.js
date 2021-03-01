import pokedexList from './pokemon.js';

//on load, grab the array and insert it into the page
const pokedex = new pokedexList('pokedex', 'pokemon');
window.addEventListener('load', () => {
  pokedex.init();
});