let sheeps = [];
let sheepsSprites;
let sheepCount = 60; //12
let message;
let canvas;

let pointsEaten = [];
let pointsNotEaten = [];
let allEaten = false;

// Sheep animation objects 
let eatingw;
let eatingb;
let walkingw;
let walkingb;

function preload() {
  message = new TextHandler();
  eatingw = loadAnimation(
    "images/eating_white/eating_white_1.png",
    "images/eating_white/eating_white_2.png",
    "images/eating_white/eating_white_3.png",
    "images/eating_white/eating_white_4.png",
    "images/eating_white/eating_white_5.png",
    "images/eating_white/eating_white_6.png",
    "images/eating_white/eating_white_7.png",
    "images/eating_white/eating_white_8.png",
    "images/eating_white/eating_white_9.png",
    "images/eating_white/eating_white_10.png",
    "images/eating_white/eating_white_11.png"
  );

  eatingb = loadAnimation(
    "images/eating_black/eating_black_1.png",
    "images/eating_black/eating_black_2.png",
    "images/eating_black/eating_black_3.png",
    "images/eating_black/eating_black_4.png",
    "images/eating_black/eating_black_5.png",
    "images/eating_black/eating_black_7.png",
    "images/eating_black/eating_black_8.png",
    "images/eating_black/eating_black_9.png",
    "images/eating_black/eating_black_10.png",
    "images/eating_black/eating_black_11.png"
  );

  walkingw = loadAnimation(
    "images/walking_white/walking_white_1.png",
    "images/walking_white/walking_white_2.png",
    "images/walking_white/walking_white_3.png",
    "images/walking_white/walking_white_4.png",
    "images/walking_white/walking_white_5.png",
    "images/walking_white/walking_white_6.png"
  );

  walkingb = loadAnimation(
    "images/walking_black/walking_black_1.png",
    "images/walking_black/walking_black_2.png",
    "images/walking_black/walking_black_3.png",
    "images/walking_black/walking_black_4.png",
    "images/walking_black/walking_black_5.png",
    "images/walking_black/walking_black_6.png"
  );
}

function setup() {
  //rectMode(CENTER);
  createCanvas(getWindowWidth(), getWindowHeight());
  setupOSC(false); // The boolean argument turns the depthstream on and off$
  useQuadTree(true);
  setupWorld();
}

function setupWorld() {
  sheepsSprites = new Group();
  message.write();
  // you can't clone a multidimenional array in javascript
  let tempArr = message.getTextPoints();
  for (let row of tempArr) {
    pointsNotEaten.push(Array.from(row));
  }

  for (let i = 0; i < sheepCount; i++) {
    let sheep = new Sheep(
      random(width, width + width), // LUKE: changed this to work with more sheep
      random(100, height - 100),
      i
    );
    sheepsSprites.add(sheep.getSprite());
    sheeps.push(sheep);
  }
}

function draw() {
  background(255);
  
  allEaten =
    pointsNotEaten[0].length +
      pointsNotEaten[1].length +
      pointsNotEaten[2].length ==
    0;

  message.drawImage(
    vw * 5,
    vh * 5,
    screen1.w * 3 - vw * 10,
    screen1.h - vh * 10
  );

  sheepsSprites.displace(sheepsSprites);

  if (position.x != 0) {
    if (!allEaten) {
      coverMessage();
      sheepWalking();
    } else {
      background(255);
      for (let j = 0; j < sheeps.length; j++) {
        sheeps[j].sheepFollowMouse();
      }
    }
  }
 drawSprites();
 

  
  //===============================================
  posterTasks(); // do not remove this last line!
  //saveCanvas(canvas,"screenshot","png");
}

function sheepWalking() {
   // Luke: draw sprites in order from top to bottom for better overlaping 
  //sheeps.sort((a, b) => (a.x > b.x) ? 1 : (a.x === b.x) ? ((a.y > b.y) ? 1 : -1) : -1 )
  for (let j = 0; j < sheeps.length; j++) {
    sheeps[j].invasion();
   // sheeps[j].sprite.draw();
    //drawSprites();
  }
}

function coverMessage() {
  for (let i = 0; i < pointsEaten.length; i++) {
    push();
    noStroke();
    fill(0, 0, 200);
    //fill(255);
    rectMode(CENTER);
    rect(pointsEaten[i].x, pointsEaten[i].y, vh * 12,vh * 12);
    pop();
  }
  for (let j = 0; j < pointsNotEaten.length; j++) {
    for (let i = 0; i < pointsNotEaten[j].length; i++) {
      push();
      noStroke();
      fill(0, 255, 0);
      //fill(255);
      rectMode(CENTER);
      rect(pointsNotEaten[j][i].x, pointsNotEaten[j][i].y, 2,2);
      pop();
    }
}
}

function getNextPoint(id) {
  let i = id % 3;
  let j;

  if (pointsNotEaten[i].length < 10) {
    j = floor(random(pointsNotEaten[i].length));
  } else {
    j = mapPointsToScreen(i);
  }

  // fred likes to act out
  if (id % sheeps.length == 0) {
    j = floor(random(pointsNotEaten[i].length));
  }

  return { i: i, j: j };
}

function mapPointsToScreen(i) {
  return abs(
    floor(
      map(
        position.x + random(pointsNotEaten[i].length / 5),
        0,
        screen1.w * 3,
        0,
        pointsNotEaten[i].length
      )
    ) + floor(random(3))
  );
}

function windowScaled() {
  // this is a custom event called whenever the poster is scaled
  textSize(10 * vw);
 // setupWorld();
}


