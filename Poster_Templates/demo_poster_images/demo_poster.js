let images = [];
let imagCount = 119; //119;

function preload() {
  for(let i=0;i<imagCount;i++) {
    let seriesNo = nf(i, 3); // this formats the index nummger into a string with 3 digits total. 
    images[i] = loadImage('images/image'+seriesNo+'.jpg'); // load up all images 
  }

}
function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(false); // impartant! Don't modify this line. 
}

function draw() {
  background(0);
  let index = floor(imagCount*posNormal.x); // find index position of image based on normal of position x
  index = constrain(index,0,imagCount-1);
  // draw the same images on all three screens: 
  image(images[index],screen1.x,0,screen1.w,screen1.h); 
  image(images[index],screen2.x,0,screen2.w,screen2.h);
  image(images[index],screen3.x,0,screen3.w,screen3.h);
  fill(255,0,0);
  circle(position.x,position.y,position.z*10);
  ///////////////
  posterTasks(); // do not remove this last line!  
}

