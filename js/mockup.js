/********
 * 
 * VARIABLES
 * 
 ********/

const sizeBox = 30;
const spots = [];
let sound;

const spotsOnX = 9;
const spotsOnY = 4;

/********
 * 
 * P5 FUNCTIONS
 * 
 ********/

function preload(){
  sound = loadSound("assets/alert.mp3");
}
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(25);
  
  sound.setVolume(0.1);

  const spaceX = windowWidth/(spotsOnX+1);
  const spaceY = windowHeight/(spotsOnY+1);
   
  for(let i = 0; i < spotsOnX; ++i) {
    for(let j = 0; j < spotsOnY; ++j) {
      spots.push({position: createVector((i+1)*spaceX, (j+1)*spaceY), onScreen: true, forbidden: true, busy : false, maxDist: 0 }); // maxDist = distance from the nearest busy spot
    }
  }

  // Make appear the first spot
  spots[0].forbidden = false;
}
 
function draw() {
  background(128, 128, 128);
 
  spots.map(elt => {
    if(elt.onScreen) {
      if(elt.forbidden) {
        fill(255, 0, 0);
        rect(elt.position.x, elt.position.y, sizeBox, sizeBox);
      }
      else if(!elt.forbidden && !elt.busy) {
        fill(0, 255, 120);
        rect(elt.position.x, elt.position.y, sizeBox, sizeBox);
      }
      else {
        fill(6, 138, 67);
        rect(elt.position.x, elt.position.y, sizeBox, sizeBox);
      }
    }
  });
}
 
function mousePressed() {

  spots.map(elt => {
    if(mouseX > elt.position.x && mouseX < elt.position.x + sizeBox && mouseY > elt.position.y && mouseY < elt.position.y + sizeBox) {
      //(elt.forbidden) ? freeSpot(elt) : takeUpASpot(elt);
      //Forbidden : display message
      if(elt.forbidden){
      	sound.play();
      }
      //Available : turns busy
      else if(!elt.forbidden && !elt.busy){
      	takeUpASpot(elt);
      }
      //Busy : turns available
      else{
      	freeSpot(elt);
      }
    }
  });
}



/********
 * 
 * OUR FUNCTIONS
 * 
 ********/

const takeUpASpot = (spot) => {
  spot.busy = true;
  spot.forbidden = false;

  // Check if every spot is busy or not
  spots.map(elt => {
    if(elt.busy) return;
  });

  spots.map(elt => computeMaxDist(elt));

  // Spot to make happen
  const newSpot = spots.slice().sort((a, b) => b.maxDist - a.maxDist)[0];
  newSpot.forbidden = false
}

const freeSpot = (spot) => {

  var count = 0;
  spots.map(elt => {
    if(elt.busy) {
        spot.busy = false;
        spot.forbidden = false;
        count ++;
    }
  });
   
    //terrain is full
    if(count < spotsOnX*spotsOnY -1 ){
        spot.busy = false;
        spot.forbidden = true;
    }
    
}

const computeMaxDist = (spot) => {
  if(spot.busy) {
    spot.maxDist = 0;
    return;
  }

  let maxDist = 10000; // Arbitrary big value
  spots.map(elt => {
    if(elt.busy) maxDist = Math.min(maxDist, spot.position.dist(elt.position));
  });

  spot.maxDist = maxDist;
}