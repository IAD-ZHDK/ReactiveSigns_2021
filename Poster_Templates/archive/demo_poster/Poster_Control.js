//let depthImage;
let data; // array of depth data
let dataFiltered; //
let w; // width of data array
let h; // width of height array
let position;// face position

/*  aspect ratio control */

const pageWidth = 2160 * 3; // samsang QM85 resolution (two screens)
const pageHeight = 3840; // samsang QM85 resolution

function correctAspectRatio() {
}

function getWindowWidth() {
  let aspectRatio = pageWidth/pageHeight;

  if (windowWidth < windowHeight) {
    // for portrait mode
    posterWidth = windowHeight;
  } else {
    // for landscape mode
    posterWidth = floor(windowHeight*aspectRatio);
  }

  return posterWidth;
}

function getWindowHeight() {
  let aspectRatio = pageHeight/pageWidth;
  if (windowWidth < windowHeight) {
    // for portrait mode
    posterHeight = floor(windowWidth*aspectRatio);
  } else {
    // for landscape mode
    posterHeight = windowHeight;
  }
  return posterHeight;
}


function windowResized() {
  resizeCanvas(getWindowWidth(), getWindowHeight());
}


function mousePressed() {
  if (mouseButton === LEFT) {
    this.openFullscreen();
    console.log(data);
  }
}

function showPoint(pos) {
  push();
  fill(255, 0, 0);
  circle(pos.x*width, pos.y*height, pos.z*width);
  pop();
}

function screenchange() {
  if (document.fullscreenElement) {
    console.log('Entering full-screen mode.');
  } else {
    console.log('Leaving full-screen mode.');
  }
}

let fpsAverage = 0;
function showFPS() {
  if (!fullscreen()) {
    push();
    fill(255, 0, 0);
    noStroke();
    fpsAverage = fpsAverage * 0.9;
    fpsAverage += frameRate() * 0.1;
    text("fps: "+Math.floor(fpsAverage), width*0.02, height*0.02);
    noFill();
    stroke(255, 0, 0);
    rectMode(CORNER);
    rect(0, 0, width, height);
    line(width/3, 0, width/3, height);
        line((width/3)*2, 0, (width/3)*2, height);
    pop();
    showPoint(position);
  }
}

function openFullscreen () {
  let elem = document.documentElement
    if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen()
  }
}
