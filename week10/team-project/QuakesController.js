import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {
  constructor(parent, position = null) {
    this.parent = parent;
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.parentElement = null;
    // let's give ourselves the option of using a location other than the current location by passing it in.
    this.position = position || {
      lat: 0,
      lon: 0
    };
    this.rad = 100;
    this.start = null;
    this.end = null;
    this.btn = null;
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.quakes = new Quake();
    this.quakesView = new QuakesView();
  }
  async init() {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), and display some quakes by calling this.getQuakesByRadius()
    console.log(`init called successfully!`);
    this.parentElement = document.querySelector(this.parent);
    this.rad = parseInt(document.getElementById('kmRadius').value);
    this.start = this.formatDateString(new Date(document.getElementById('startDate').value + 'T00:00'));
    this.end = this.formatDateString(new Date(document.getElementById('endDate').value + 'T00:00'));
    this.btn = this.buildBackButton();
    await this.initPos();
    this.getQuakesByRadius(this.rad);
  }
  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        // try to get the position using getLocation()
        const myLocation = await getLocation();
        console.log(myLocation);
        // if we get the location back then set the latitude and longitude into this.position
        if(myLocation){
            this.position.lat = myLocation.coords.latitude;
            this.position.lon = myLocation.coords.longitude;
        }        
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  formatDateString(date){
    let thisMonth = date.getMonth() + 1;
      thisMonth = thisMonth < 10 ? '0' + thisMonth : thisMonth;
    let thisDate = date.getDate();
      thisDate = thisDate < 10 ? '0' + thisDate : thisDate;
    const dateString = `${date.getFullYear()}-${thisMonth}-${thisDate}`;
    return dateString;
  }

  async getQuakesByRadius(radius) {
    // this method provides the glue between the model and view. Notice it first goes out and requests the appropriate data from the model, then it passes it to the view to be rendered.
    //set loading message
    this.btn.classList.add('hidden');
    this.parentElement.innerHTML = 'Loading...';
    radius = parseInt(document.getElementById('kmRadius').value);

    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position, radius, this.start, this.end
    );
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details
    this.parentElement.addEventListener('click', e => {
      this.getQuakeDetails(e.target.dataset.id);
    });
  }

  async getQuakeDetails(quakeId) {
    // get the details for the quakeId provided from the model, then send them to the view to be displayed
    const quake = this.quakes.getQuakeById(quakeId);
    console.log(quakeId);
    this.quakesView.renderQuake(quake, this.parentElement);
    this.btn.classList.remove('hidden');
  }

  buildBackButton(){
    const backBtn = document.createElement('button');
      backBtn.textContent = 'Back to List';
      backBtn.addEventListener('click', e =>{
        this.getQuakesByRadius(this.rad);
      })
    this.parentElement.before(backBtn);
    return backBtn;
  }
}