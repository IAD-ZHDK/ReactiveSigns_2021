// dataFiltered : represents an array of depth data. Only available with setupOSC(true)

// depthW: The horizontal resolution of the dataFiltered aray

// depthH: The vertical resolution of the dataFiltered aray

// stolenlaw



let brickLength;
let brickLengthWithSpace;
let brickHeightWithSpace;
let brickRows;
let brickColumns;
let brickHeight;
let brickDeep;
let totalWidth;
let totalHeight;

let bricks = [];
isLetter = false;
let shiftValue =0;
let canvas;
let onlyLetters = []
let brickTextTexture;
let brickLetters =[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,0,0,0,0,0,1,1,1,1,1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
  [0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0],
  [0,0,1,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0],
  [0,0,1,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0],
  [0,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,0,1,0,0,1,0,0,1,0],
  [0,0,0,0,1,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0],
  [0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
  [0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
  [0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
  [0,0,1,0,0,1,0,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0],
  [0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0],
  [0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,0,1,0,0,0,1,0,1,1,0,0,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,1,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,1,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,0,1,0,0,1,0,0,1,0,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,1,0,0,1,0,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,0,0,1,0,1,1,1,1,1,0,1,1,0,0,1,1,0,1,0,0,0,1,0,1,1,1,1,0,0,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]


let myFont;
function preload() {
    myFont = loadFont('barlow_condensed.otf');
}

function setup() {
  canvas = createCanvas(getWindowWidth(),getWindowHeight()); // impartant! Don't modify this line.
  setupOSC(true); // Don't remove this line. 1 argument to turn the depthstream on and off
  textFont(myFont); // impartant! WEBGL has no defualt font  //
  //brick = new Brick(brickLength);
  //brick1 = new Brick(25);
  //brickLength = 2.7*vw;

 //brickLengthWithSpace =brickLength/10+brickLength;
  //brickHeightWithSpace = (brickLength/2)/10+(brickLength/2);

  //ortho();


 //brickTextTexture.image(img1, 0, 0, textTexture1.width, cylinderHeight);
  
 //setBackgroundCSS() 
 setupBricks();
}

function setupBricks() {
  bricks = [];
  onlyLetters = []
  brickRows = brickLetters.length;
  brickColumns = brickLetters[0].length; // use 64
  brickLengthWithSpace = width/brickColumns;
  brickLength = brickLengthWithSpace-(brickLengthWithSpace/10);
  brickHeightWithSpace = height/brickRows;
  brickHeight = brickHeightWithSpace-(brickHeightWithSpace/10);
  //brickHeight = brickLength/2;
  brickDeep = brickHeight/2;
  totalWidth = brickColumns*brickLengthWithSpace;
  totalHeight = (brickRows+1)*(brickHeightWithSpace);
  noStroke();
  fill(255);
  for(let k = 0; k < brickRows; k++){
    for(let i = 0; i < brickColumns; i++){
      if(brickLetters[k][i] == 1){
        let x = brickLengthWithSpace*i + (k%2 * -brickLengthWithSpace/2)
        let y = brickHeightWithSpace*k 
        let cordinates = [x,y,0]; // x, y, offset
        onlyLetters.push(cordinates)
      }
    }
  }
  console.log(brickRows);
  createBrickImage()
}


function setBackgroundCSS()  {
  //const canvas =  document.getElementsByClassName("p5Canvas");
 // cnv.id('mycanvas');
  console.log("canvas"+canvas.id());
  document.getElementById(canvas.id()).style.backgroundImage = "url('background.png')";
  document.getElementById(canvas.id()).style.backgroundSize = "100% 100%";
}

function createBrickImage() {
 // crate 2d texture of non moving bricks
 brickTextTexture = createGraphics(width,height);
 brickTextTexture.background(0);

 let W_Spaced = brickTextTexture.width/brickColumns;
 let W = W_Spaced-(W_Spaced/10);
 let H_Spaced = brickTextTexture.height/brickRows;
 let H = H_Spaced-(H_Spaced/10);

 for(let k = 0; k < brickRows; k++){
  for(let i = 0; i < brickColumns+2; i++){
      let x = W_Spaced*i +(k%2 * -W_Spaced/2)
      let y = H_Spaced*k 
     // fill(255,0,0)
      brickTextTexture.rect(x,y,W,H)
    }
}
//brickTextTexture.save('background.png');
}

function draw() {
  //clear();
  //push()
  // image(brickTextTexture);
  //plane(brickTextTexture.width, brickTextTexture.height);
  //pop();
  translate(vh,0)
  image(brickTextTexture,0,0)
 
  //translate(-totalWidth/2, -totalHeight/2);
  for(let i = onlyLetters.length-1; i >= 0; i--){
 // for(let i = 0; i < onlyLetters.length; i++){
   //console.log(i);
   let depth = 0;
    let x = onlyLetters[i][0];
    let y = onlyLetters[i][1];
    if(tracking==true){
      depth = getDepth(x,y);
    } else {
      depth = 0;
      //depth = (sin(radians(i+frameCount))*10)+10;
    }
    let average = onlyLetters[i][2]*0.9;
    average += depth*0.1;
    onlyLetters[i][2] = average;
    depth = average 
   // translate(x, y);
    //plane(brickLength, brickHeight);
    //2.5D effect 
    fill(100)
    quad(x, y, x, y+brickHeight, x+depth, y+brickHeight+depth, x+depth, y+depth);
    fill(200);
    quad(x, y, x+depth, y+depth, x+brickLength+depth, y+depth, x+brickLength, y);
    fill(255)
    x += depth;
    y += depth;
    rect(x, y,brickLength, brickHeight)
  }
  posterTasks(); // do not remove this last line!  
}

function getDepth(x, y) {
  let depth = 0
  /*
  if (oscSignal)  {
    try {
    //newPosition = width - position.x; ////////// LUKE: added to invert when using the
       let depthX = floor((x/width) * depthW)
       let depthY = floor((y/height) * depthH)
       let index = (depthY*depthW)+depthX;
          if (dataFiltered[index] > 0.0) {
              depth = map(dataFiltered[index],0,20, 0, vh*6, true);           
          }
    } catch (e) {
    }
  } else {
    */
     // let distance = dist(position.x,position.y,x,y)
     var a = (position.x - x)*2;
      var b = (position.y - y);

    let distance = Math.sqrt( a*a + b*b );
      depth = map(distance,0,vh*60,vh*8,0, true); 
    //}
  return depth;
}




function windowScaled() {
  // this is a custom event called whenever the poster is scaled
  setupBricks();
 // setupWorld();
}
