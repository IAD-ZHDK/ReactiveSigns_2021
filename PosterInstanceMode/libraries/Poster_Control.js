const pageWidth = 2160 * 3; // samsang QM85 resolution (two screens)
const pageHeight = 3840; // samsang QM85 resolution
/*  aspect ratio control */
const screen1 = {x:0, y:0, w:100, h:100, cntX: 50, cntY: 50};
const screen2 = {x:0, y:0, w:100, h:100, cntX: 50, cntY: 50};
const screen3 = {x:0, y:0, w:100, h:100, cntX: 50, cntY: 50};

let vw = 1; // 1 percent of viewport width;
let vh = 1; // 1 percent of viewport height;

class posterControl {
constructor(p) {
this.oscSignal = false;// osc signal
// helper variables for scalable positioning
this.p = p;
this.fpsAverage = 0;
}


correctAspectRatio() {
  let offsetX = 0;
  let offsetY = 0;
  if (this.p._renderer.drawingContext instanceof WebGLRenderingContext) {
    offsetX = - Math.floor(this.p.width/2)
    offsetY = - Math.floor(this.p.height/2)
  }
  screen1.w = Math.floor(this.p.width/3);
  screen1.h = this.p.height;
  screen1.x = offsetX;
  screen1.y = offsetY;
  screen1.cntX = screen1.x + screen1.w/2;
  screen1.cntY = screen1.y + screen1.h/2; 
  //
  screen2.w = Math.floor(this.p.width/3);
  screen2.h = this.p.height;
  screen2.x = offsetX + Math.floor(this.p.width/3);
  screen2.y = offsetY;
  screen2.cntX = (screen2.w/2)+screen2.x;
  screen2.cntY = (screen2.h/2)+screen2.y; 
  //
  screen3.w = Math.floor(this.p.width/3);
  screen3.h = this.p.height;
  screen3.x = offsetX+(Math.floor(this.p.width/3)*2);
  screen3.y = offsetY;
  screen3.cntX = screen3.w/2+screen3.x;
  screen3.cntY = screen3.h/2+screen3.y;
//
  // 
  vw = this.p.width*0.01; // 1 percent of viewport width;
  vh = this.p.height*0.01;// 1 percent of viewport height;  
}


getWindowWidth() {
  let aspectRatioWH = pageWidth/pageHeight; // width to height
  let aspectRatioHW = pageHeight/pageWidth; // height to width
  let posterWidth = 0;
  let currentRatio = this.p.windowWidth/this.p.windowHeight;
  if (this.p.windowWidth < this.p.windowHeight*aspectRatioWH) {
    // for portrait mode
    posterWidth = this.p.windowWidth;
  } else {
    // for landscape mode
    posterWidth = Math.floor(this.p.windowHeight*aspectRatioWH);
  }
  return posterWidth;
}

getWindowHeight() {
  let aspectRatioWH = pageWidth/pageHeight; // width to height
  let aspectRatioHW = pageHeight/pageWidth; // height to width
  let posterHeight = 0;
  if (this.p.windowWidth < this.p.windowHeight*aspectRatioWH) {
    // for portrait mode
    posterHeight = Math.floor(this.p.windowWidth*aspectRatioHW);
  } else {
    // for landscape mode
    posterHeight = this.p.windowHeight;
  }
  return posterHeight;
}

 resized() {
  this.p.resizeCanvas(this.getWindowWidth(), this.getWindowHeight());
  this.correctAspectRatio();
  if (this.p._renderer.drawingContext instanceof WebGLRenderingContext) {
   // ortho(); // todo. delete this line once students code is updated
    }
  try {
    // windowScaled();
  }   catch(e) {
  }
}


showPoint(pos) {
  this.p.push();
  this.p.fill(0, 180, 180);
  this.p.noStroke();
  this.p.circle(pos.x, pos.y, pos.z*10);
  this.p.pop();
}

screenchange() {
  if (document.fullscreenElement) {
    this.resized()
    console.log('Entering full-screen mode.');
  } else {
    this.resized()
    console.log('Leaving full-screen mode.');
  }
}



posterTasks() {
 
  /*
  if (millis()-lastOSC>=2000) {
     // if there is no osc connection, then use mouse for position
    updatePosition(mouseX/width,mouseY/height,1.0)
    oscSignal = false;
  } else {
    oscSignal = true;
  }
  
*/ 
  // show helplines when outside of fullscreenmode
  if (!this.p.fullscreen()) {
    this.p.push();
    this.p.fill(0, 180, 180);
    this.p.noStroke();
    this.fpsAverage =  this.fpsAverage * 0.9;
    this.fpsAverage += this.p.frameRate() * 0.1;
    this.p.textSize(1.2*vw);
    this.p.textAlign(this.p.LEFT, this.p.TOP);
    this.p.text("fps: "+Math.floor(this.fpsAverage), screen1.x+vw, screen1.y+vh);
    //this.p.text("Streaming: "+oscSignal, screen1.x+vw, screen1.y+vh+vh+vh);
    //this.p.text("tracking: "+tracking, screen1.x+vw, screen1.y+vh+vh+vh+vh+vh);
    this.p.noFill();
    this.p.stroke(0, 180, 180);  
    this.p.rectMode(this.p.CORNER);
    this.p.rect(screen1.x, screen1.y, this.p.width, this.p.height);
    this.p.line(screen2.x, screen2.y, screen2.x, screen2.y+screen2.h); // line between 1st and 2nd screen
    this.p.line(screen3.x, screen3.y, screen3.x, screen3.y+screen3.h);  // line between 2nd and 3rd screen
    this.p.pop();
    this.showPoint(position);
}
}

openFullscreen() {
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
  this.resized();
}
}
