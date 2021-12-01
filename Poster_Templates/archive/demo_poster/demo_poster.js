

function setup() {
  createCanvas(getWindowWidth(), getWindowHeight());
  // todo: add warning when osc connection doesn't work
  //correctAspectRatio();
  setupOSC();
}

function draw() {
  background(0);
  //image(depthImage, 0, 0, window.innerWidth, window.innerHeight);
  pixelEffect();
  //rotationEffect()
  updateOSC();
  showFPS();
}

function rotationEffect() {
  fill(255);
  noStroke();
  let spaceX = width/w;
  let spaceY = height/h;
  for (let i = 1; i<h; i+=5) {
    for (let j = 1; j<w; j+=5) {
      let index = (i*w)+j;
      let rotation = (dataFiltered[index]/255)*PI;
      push();
      translate(spaceX*j, spaceY*i);
      rotate(rotation);
      rect(0, 0, 3, spaceX*1.5);
      pop();
    }
  }
}

function pixelEffect() {
  fill(255);
  noStroke();
  let spaceX = width/w;
  let spaceY = height/h;
  let radius = (width *0.005);
  for (let i = 0; i<h; i+=4) {
    for (let j = 0; j<w; j+=4) {
      let index = (i*w)+j;
      if (dataFiltered[index] > 0.0) {
        push();
        
        // Paralax effect
        let paralaxFactor = 255 - dataFiltered[index];
        //translate(spaceX*j/width, spaceY*i/height);
        translate(position.x*paralaxFactor, position.y*paralaxFactor);
        circle(spaceX*j, spaceY*i, radius);
        pop();
      }
    }
  }
}

function pixelEffectV2() {

  let spaceX = width/w;
  let spaceY = height/h;

  for (let i = 0; i<h; i+=4) {
    for (let j = 0; j<w; j+=4) {
      let index = (i*w)+j;
      if (dataFiltered[index] > 0.0) {
        push();
        fill(255);
        stroke(255);
        translate(spaceX*j, spaceY*i);
        let v1 = createVector(spaceX*j, spaceY*i);
        v1.sub(position);
        //v1.normalize();
        //v1.mult(20);
        let radius = dataFiltered[index] / ( width *0.2);
        // Paralax effect
        let paralaxFactor = 255 - dataFiltered[index];
        //translate(spaceX*j/width, spaceY*i/height);
        //circle(0, 0, 4);
        line(0, 0, v1.x, v1.y);
        circle(v1.x, v1.y, 4);
        pop();
      }
    }
  }
}
