import Pokemon from './pokemon.js';

//on load, grab the array and insert it into the page
const pokemon = new Pokemon('starwars', 'people');
window.addEventListener('load', () => {
  swPeople.init();
});