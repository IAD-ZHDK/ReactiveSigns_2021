let images = [];
let imagCount = 270; //119;
let state = 0;
const startState = 0;
const loopState = 1;
const trackingState = 2;
const endTrackingState = 3;
let index = 0;
let loopIndex = 0;
function preload() {
  for (let i = 0; i < imagCount; i++) {
    let seriesNo = nf(i, 3); // this formats the index nummger into a string with 3 digits total. 
    images[i] = loadImage('images/image' + seriesNo + '.png'); // load up all images 
  }

}
function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(false); // impartant! Don't modify this line. 
  state = startState; //0
}

function draw() {
  if (startState == state) {
    image(images[index], screen1.x, 0, width, screen1.h);
    if (frameCount % 3 == 0) {
      index++;
    }
    if (index > 78) {
      state = loopState;
      loopIndex = 79;
    }
  } else if (loopState == state) {
    loopAnimation();
    if (tracking == true) {
      state = trackingState;
    }
  } else if (trackingState == state) {
    
    loopAnimation();

    if (posNormal.x<0.5 && tracking==false) {
      state=loopState;
    }
 
    let startIndex = 128; // first index of tracking series
    let endIndex = 245; // last index of tracking series
    index = startIndex + floor((endIndex - startIndex) * posNormal.x); // find index position of image based on normal of position x
    index = constrain(index, startIndex, endIndex);
    // draw the same images on all three screens: 
    image(images[index], screen1.x, 0, width, screen1.h);
    if (posNormal.x>0.5 && tracking == false) {
      state = endTrackingState;
    }
  } else if (endTrackingState == state) {
    background(255);
    image(images[index], screen1.x, 0, width, screen1.h);
    if (frameCount % 3 == 0) {
      index++;
    }
    if (tracking == true) {
      state = trackingState;
    }
    if (index >= 270) {
      state = startState;
      index=0;
    }

  }

  //fill(255, 0, 0);
  //circle(position.x, position.y, position.z * 10);
  ///////////////
  posterTasks(); // do not remove this last line!  
}

function loopAnimation() {
   // endless loop
  // console.log(loopIndex);

   if (frameCount % 3 == 0) {
     loopIndex++;
   }
   if (loopIndex == 127) {
     loopIndex = 79;
   }
   image(images[loopIndex], screen1.x, 0, width, screen1.h);
}

