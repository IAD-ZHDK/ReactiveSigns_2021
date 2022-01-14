var font;
var buffer;
let cylinderRadius = 180;
let imagePixels = [];
function preload() {
  font = loadFont('RobotoMono-Bold.otf'); // note that this font is in the files section, you will need to add a new otf file to use other fonts
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(width / 3);
  textAlign(CENTER, CENTER);
	buffer = createGraphics(windowWidth/20, windowHeight/20); // make a buffer much smaller then windowsize
  buffer.fill(255);
	buffer.background(0,255,0);
	buffer.textFont(font);
	buffer.textAlign(CENTER, CENTER);
  buffer.textSize(30);
	buffer.text("ZHdK", buffer.width/2, buffer.height/2.5); // little tweak here to get it in the middle
	buffer.filter(BLUR, 1.2); // this will give us some nice gradients
	// loop through all the pixels in the buffer and save them to an array
	for (let x = 0; x < buffer.width; x++) {
		imagePixels[x] = []; // create nested array
		for (let y = 0; y < buffer.height; y++) {
			let pixelColor = buffer.get(x, y); 
			let r = red(pixelColor); //lets just take the first color chanel
			imagePixels[x][y] = r/5;
		}
	}

}
function draw() {
  background(0);
	stroke(255);
	strokeWeight(2);
	noFill();
	let stepX = windowWidth/buffer.width;
	let stepY = windowHeight/buffer.height;
	// loop through all the pixels in the buffer
	for (let y = 0; y < buffer.height; y++) {
		beginShape();
		for (let x = 0; x < buffer.width; x++) {
			let h = imagePixels[x][y]*(mouseX/width); // we modify the height of our sudo 3D result using the mouseX
			let noiseScale = (mouseY/height);
			let noiseMouse = noise(x/noiseScale, y/noiseScale, frameCount/noiseScale)*(mouseY/height)*10; // here the noise value is tweeked with some modifiers to the result I was looking for
			h += noiseMouse;
			curveVertex(x*stepX, (y*stepY)-h);
		}
		endShape();
	}
	image(buffer,0,0); // uncomment to see how the buffer actually looks 
}