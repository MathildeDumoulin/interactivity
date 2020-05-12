const winWidth = 800;
const winHeight = 500;
 
const sizeCircle = 20;
const defaultCircleX = 0 + sizeCircle / 2.0;
const defaultCircleY = winHeight - sizeCircle / 2.0;
 
const sizeBox = 30;
const defaultDistance = 250;
const minDistance = 100;
const basement = [];
const toAppear1 = [];
const toAppear2 = [];
const toAppear = [];
 
function setup() {
  createCanvas(winWidth, winHeight);
  frameRate(25);
   
  for(let i = 0; i < 2; ++i) {
    for(let j = 0; j < 2; ++j) {
      basement.push({x: defaultDistance*2*i, y: defaultDistance*j, busy: false});
    }
  }
 
  for(let i = 1; i < 4; i+=2) {
    for(let j = 0; j < 2; ++j) {
      toAppear1.push({x: defaultDistance*i, y: defaultDistance*j, busy: false});
    }
  }
 
  for(let i = 0; i < 3; ++i) {
    for(let j = 0; j < 2; ++j) {
      toAppear2.push({x: defaultDistance*(i+0.5), y: defaultDistance*(j+0.5), busy: false});
    }
  }
 
  toAppear.push(toAppear1);
  toAppear.push(toAppear2);
}
 
function draw() {
  background(128, 128, 128);
 
  fill(255);
  circle(defaultCircleX, defaultCircleY, sizeCircle);
 
  let busyNb = 0;
 
  for(const elt of basement) {
    if(elt.busy) {
      fill(255, 0, 0);
      rect(elt.x, elt.y, sizeBox, sizeBox);
      ++busyNb;
    }
    else {
      fill(0, 255, 120);
      rect(elt.x, elt.y, sizeBox, sizeBox);
    }
  }
 
  if(busyNb === basement.length) {
    if(toAppear.length > 0) {
      const newElts = toAppear[0];
      for(const elt of newElts) {
        basement.push(elt);
      }
      toAppear.splice(0, 1);
    }
  }
}
 
function mousePressed() {
  for(const elt of basement) {
    if(mouseX > elt.x && mouseX < elt.x + sizeBox && mouseY > elt.y && mouseY < elt.y + sizeBox) {
      elt.busy = !elt.busy;
    }
  }
}