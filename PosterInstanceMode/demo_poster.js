
// dataFiltered : represents an array of depth data. Only available with setupOSC(true)
// depthW: The horizontal resolution of the dataFiltered aray
// depthH: The vertical resolution of the dataFiltered aray
let sketch = function(p) {

let posterC;
let myFont;
p.preload = function() {
  myFont = p.loadFont('barlow_condensed.otf');
}
p.setup = function() {
  posterC = new posterControl(p);
  p.createCanvas(posterC.getWindowWidth(), posterC.getWindowHeight(), p.WEBGL); // impartant! Don't modify this line. 
  posterC.correctAspectRatio();
  //ortho();
  // setupOSC(false); // Don't remove this line. 1 argument to turn the depthstream on and off
  p.textFont(myFont); // impartant! WEBGL has no defualt font
  let cam = p.createCamera();
  console.log(cam)
}

p.draw = function() {
  p.background(255,0,100);
  //effect1()
  // effect2()
  //p.circle(position.x,position.y,10);
 posterC.posterTasks(); // do not remove this last line!  
}

p.windowResized = function(){
  console.log("try ")
  posterC.resized() 
}

p.mousePressed = function() {
  if (p.mouseButton === p.LEFT) {
    posterC.openFullscreen();
  }
}

document.addEventListener('fullscreenchange', (event) => {
    // document.fullscreenElement will point to the element that
    // is in fullscreen mode if there is one. If there isn't one,
    // the value of the property is null.
    if (document.fullscreenElement) {
      console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
      posterC.resized();  
    } else {
      console.log('Leaving full-screen mode.');
      posterC.resized();  
    }
  });

}


/*
function effect2() {
  p.noStroke();
  let dirX = (position.x / width - 0.5) * 2;
  let dirY = (position.y / height - 0.5) * 2;
  p.directionalLight(250, 250, 250, -dirX, -dirY, -1);
  let Wcount = 40;
  let Hcount = 30;
  let spaceX = p.width/Wcount;
  let spaceY = p.height/Hcount;
  for (let x = 0; x<=Wcount; x++) {
    for (let y = 0; y<=Hcount; y++) {
      p.push()
      p.translate(-width/2,-height/2, - 30)
        let zOffset = Math.sin(radians(x+y+frameCount))*30-30;
      p.translate(spaceX*x, spaceY*y, zOffset)
      p.box(spaceX-vw, spaceY-vh);
      p.pop()
    }
  }
}

function effect1() {
  p.normalMaterial();
  p.push();
  p.translate(screen1.cntX,screen1.cntY,0);
  p.rotateZ(frameCount * 0.001);
  p.rotateX(posNormal.x);
  //rotateY(frameCount * 0.001);
  p.cylinder(screen1.w/4, vh*30, 30, 1);
  p.pop();

  p.push();
  p.translate(screen2.cntX,screen2.cntY,0);
  p.rotateZ(frameCount * 0.001);
  p.rotateX(posNormal.x);
  p.rotateY(frameCount * 0.001);
  p.torus(vh*10, vh*5);
  p.pop();

  p.push();
  p.translate(screen3.cntX,screen3.cntY,0);
  p.rotateZ(frameCount * 0.001);
  p.rotateX(posNormal.x);
  p.rotateY(frameCount * 0.001);
  p.box(vh*10);
  p.pop();
}

function windowScaled() {
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
   // ortho();
    }
}
*/


let myp5 = new p5(sketch);

