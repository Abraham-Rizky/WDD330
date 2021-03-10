import { getJSON, getLocation } from './utilities.js';
import QuakesController from './QuakesController.js';

const myQuakes = new QuakesController(`#quakeList`);
myQuakes.init();