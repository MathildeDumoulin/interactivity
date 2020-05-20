/********
 * 
 * VARIABLES
 * 
 ********/

const sizeBox = 30;
const spots = [];



/********
 * 
 * P5 FUNCTIONS
 * 
 ********/
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(25);

  const spotsOnX = 9;
  const spotsOnY = 4;

  const spaceX = windowWidth/(spotsOnX+1);
  const spaceY = windowHeight/(spotsOnY+1);
   
  for(let i = 0; i < spotsOnX; ++i) {
    for(let j = 0; j < spotsOnY; ++j) {
      spots.push({position: createVector((i+1)*spaceX, (j+1)*spaceY), onScreen: false, busy: false, maxDist: 0}); // maxDist = distance from the nearest budy spot
    }
  }

  // Make appear the first spot
  spots[0].onScreen = true;
}
 
function draw() {
  background(128, 128, 128);
 
  spots.map(elt => {
    if(elt.onScreen) {
      if(elt.busy) {
        fill(255, 0, 0);
        rect(elt.position.x, elt.position.y, sizeBox, sizeBox);
      }
      else {
        fill(0, 255, 120);
        rect(elt.position.x, elt.position.y, sizeBox, sizeBox);
      }
    }
  });
}
 
function mousePressed() {
  spots.map(elt => {
    if(mouseX > elt.position.x && mouseX < elt.position.x + sizeBox && mouseY > elt.position.y && mouseY < elt.position.y + sizeBox) {
      (elt.busy) ? freeSpot(elt) : takeUpASpot(elt);
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

  // Check if every visible spot is busy or not
  spots.map(elt => {
    if(elt.onScreen) {
      if(!elt.busy) return;
    }
  });

  spots.map(elt => computeMaxDist(elt));

  // Spot to make happen
  const newSpot = spots.slice().sort((a, b) => b.maxDist - a.maxDist)[0];
  console.log(newSpot)
  newSpot.onScreen = true;
}

const freeSpot = (spot) => {
  // If at least one spot is not busy, we can remove this one
  spots.map(elt => {
    if(!elt.busy) spot.onScreen = false;
  });
  
  spot.busy = false;
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