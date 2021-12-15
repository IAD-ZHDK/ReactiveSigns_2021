
// dataFiltered : represents an array of depth data. Only available with setupOSC(true)
// depthW: The horizontal resolution of the dataFiltered aray
// depthH: The vertical resolution of the dataFiltered aray

let myFont;
function preload() {
  myFont = loadFont('barlow_condensed.otf');
}


function setup() {
  createCanvas(getWindowWidth(), getWindowHeight(), WEBGL); // impartant! Don't modify this line. 
  ortho();
  setupOSC(false); // Don't remove this line. 1 argument to turn the depthstream on and off
  textFont(myFont); // impartant! WEBGL has no defualt font
}

function draw() {
  background(255,0,100);
  effect1()
  //effect2()
  circle(position.x,position.y,10);
  posterTasks(); // do not remove this last line!  
}

function effect2() {
  noStroke();
  let dirX = (position.x / width - 0.5) * 2;
  let dirY = (position.y / height - 0.5) * 2;
  directionalLight(250, 250, 250, -dirX, -dirY, -1);
  let Wcount = 40;
  let Hcount = 30;
  let spaceX = width/Wcount;
  let spaceY = height/Hcount;
  for (let x = 0; x<=Wcount; x++) {
    for (let y = 0; y<=Hcount; y++) {
        push()
        translate(-width/2,-height/2, - 30)
        let zOffset = sin(radians(x+y+frameCount))*30-30;
        translate(spaceX*x, spaceY*y, zOffset)
        box(spaceX-vw, spaceY-vh);
        pop()
    }
  }
}

function effect1() {
  normalMaterial();
  push();
  translate(screen1.cntX,screen1.cntY,0);
  rotateZ(frameCount * 0.001);
  rotateX(posNormal.x);
  //rotateY(frameCount * 0.001);
  cylinder(screen1.w/4, vh*30, 30, 1);
  pop();

  push();
  translate(screen2.cntX,screen2.cntY,0);
  rotateZ(frameCount * 0.001);
  rotateX(posNormal.x);
  rotateY(frameCount * 0.001);
  torus(vh*10, vh*5);
  pop();


  push();
  translate(screen3.cntX,screen3.cntY,0);
  rotateZ(frameCount * 0.001);
  rotateX(posNormal.x);
  rotateY(frameCount * 0.001);
  box(vh*10);
  pop();
}
