let font; // opentype.js font object
let fSize; // font size
let msg; // text to write
let pts = []; // store path data
let path;
//let pathResampled;
let newPathCommands = [];

async function preload() {
  let filePath = '../RobotoMono-Bold.otf';
  await opentype.load(filePath, function (err, f) {
    if (err) {
      alert('Font could not be loaded: ' + err);
    } else {
      font = f;
      console.log('font ready');
      fSize = 120; // make adaptive
      msg = 'HATE SPEECH';
      let x = 0;
      let y = 0;
      path = font.getPath(msg, x, y, fSize);
      resampleOpenTypePath(path, 10);
    }
  }
  );
}


function setup() {

  createCanvas(getWindowWidth(), getWindowHeight());
  position = createVector(0, 0, 0);
  if (!font) {
    console.log("font not loaded yet");
  } else {
    console.log(path.commands);
  }
}


// using opentype library
async function setupFont(filePath) {
  await opentype.load(filePath, function (err, f) {
    if (err) {
      alert('Font could not be loaded: ' + err);
    } else {
      font = f;
      console.log('font ready');
      fSize = 60; // make adaptive
      msg = 'HATE SPEECH';
      let x = 0;
      let y = 0;
      path = font.getPath(msg, x, y, fSize);
    }
  }
  );
}

function resampleOpenTypePath(path, rate) {
  let lastCMD;
  for (let i = 0; i<path.commands.length; i++) {
    let cmd = path.commands[i];
    if (lastCMD !=  null) {
      // if we have a straight line segment subdivide it.
      if (cmd.type === 'L' || cmd.type === 'M' || cmd.type === 'Z' && lastCMD.type === 'L'|| lastCMD.type === 'M' || lastCMD.type === 'Z' ) {
        addPointsToPath(lastCMD, cmd, newPathCommands, 10);
      }
    }
    newPathCommands.push(cmd);
    lastCMD = cmd;
  }

  function addPointsToPath(point1, point2, pointArray, density) {
   
    let distance = dist(point1.x, point1.y, point2.x, point2.y);
     for(let i = 0; i<=density; i++) {
            // possibly use math.matrix for vector math here 
    let midPointX = point1.x+((point2.x-point1.x)/density)*i; // for new intermidiate point 
    let midPointY = point1.y+((point2.y-point1.y)/density)*i;// for new intermidiate point 
      let newPoint = {x:
      midPointX, y:
      midPointY, type:
        "L"
      };

  pointArray.push(newPoint);

    }

}

console.log(newPathCommands);
//return newPathCommands;
}

function draw() {
  if (!font) {
    return;
  }
  let bounds = path.getBoundingBox();
  let X = (width/2)+(bounds.x1-bounds.x2)/2;
  let Y = (height/2)-(abs(bounds.y1-bounds.y2)/4);
  //console.log(bounds);
  background(0);
  noFill();
  stroke(255);
  push();
  translate(X, Y);
  //for (let cmd of path.commands) {
  for (let cmd of newPathCommands) {

    let pointx = cmd.x + random(3.0);
    let pointy = cmd.y + random(3.0);
    /*
     M: moveTo() command; p5 equivalent is beginShape() and vertex()
     L: lineTo() command; p5 equivalent isvertex()
     C: bezierCurveTo() command; p5 equivalent is bezierVertex()
     Q: quadraticCurveTo() command; p5 equivalent is quadraticVertex()
     Z: closePath() command; p5 equivalent is endShape()
     */
    if (cmd.type === 'M') {
      beginShape();
      vertex(pointx, pointy);
    } else if (cmd.type === 'L') {
      vertex(pointx, pointy);
      //circle(pointx, pointy,2,2);
    } else if (cmd.type === 'C') {
      bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, pointx, pointy);
    } else if (cmd.type === 'Q') {
      quadraticVertex(pointx, cmd.y1, pointx, pointy);
    } else if (cmd.type === 'Z') {
      endShape(CLOSE);
    }
  }
  pop();
  showFPS();
}
