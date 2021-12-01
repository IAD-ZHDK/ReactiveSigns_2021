var x = 0;
var y = 0;
var stepSize = 5.0;

var font = 'Georgia';
var letters = ' STOP HATE SPEACH ';
var fontSizeMin = 3
  var angleDistortion = 0.0;

var counter = 0;

function setup() {

  createCanvas(getWindowWidth(), getWindowHeight());
  position = createVector(0, 0, 0);
  setupOSC();

  textFont(font);
  textAlign(LEFT);
  fill(0);
  background(255);
  x = width/2;
  y = height/2;
}


function draw() {

  let xPoint = position.x*width;
  let yPoint = position.y*height;
  if (x != xPoint && y != yPoint) {
    var d = dist(x, y, xPoint, yPoint);

    textSize(fontSizeMin + d / 2);
    var newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(yPoint - y, xPoint - x);

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
      if (counter >= letters.length) {
        counter = 0;
      }
      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
  // showFPS();
}
