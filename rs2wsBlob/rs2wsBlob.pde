// realsense 2 websocket
// sends depth data from realsense to websockets
// written 2021 by Florian Bruggisser
// modified by Luke Franzke for the Reactive Signs Module, ZHdK
import processing.javafx.*;
import ch.bildspur.realsense.*;
import ch.bildspur.realsense.type.*;
import ch.bildspur.realsense.processing.*;
import controlP5.*;
import websockets.*;
import oscP5.*;
import gab.opencv.*;
import java.awt.Rectangle;
import java.io.*;
import java.util.Calendar;

ControlP5 cp5;

Range range;

final int PORT = 8025;

final int WIDTH = 640;
final int HEIGHT = 480;
final int DECIMATION = 4;

float cropY =  0.3;// percent
float cropHeight =  0.5;// percent
float cropX=  0.05;// percent
float cropWidth = 0.9;// percent
//final int blobY= floor((HEIGHT/DECIMATION)*0.3);
//final int blobHeight = floor((HEIGHT/DECIMATION)*0.5);

WebsocketServer ws;
RealSenseCamera camera = new RealSenseCamera(this);
RSThresholdFilter thresholdFilter;

float minDistance = 0.0f;
float maxDistance = 10.0f;
float lowDistance = minDistance;
float highDistance = maxDistance;
float size = 0.5f;

byte[] depthBuffer = null;
boolean cameraRunning = false;
boolean trackingAtive = false;
int measured = 0;
PImage defualtFrame;
float filterRatio = .95f;

ArrayList<Contour> contours;
private OpenCV opencv;
PVector singlePointAverage = new PVector(0, 0);

CSVDataStore CSVData;


void setup() {
    size(640, 480, FX2D);
    /*
    try{
      PrintStream o = new PrintStream(new File("movingPostersLog2021" + Calendar.DAY_OF_MONTH + "_" + Calendar.HOUR + "_" + Calendar.MINUTE + ".log"));
      System.setOut(o);
      System.setErr(o);
      println("starting output stream");
    }catch(FileNotFoundException e){
      println(e);
      println("no output stream");
    }
    */
  CSVData = new CSVDataStore(); // recover settings for distance camera
  try {
    // setup websocket
    ws = new WebsocketServer(this, PORT, "/");
    // setup buffer
    depthBuffer = new byte[WIDTH / DECIMATION * HEIGHT / DECIMATION];
  }

  catch (Exception ex) {
    text("Error starting up websocket: " + ex.getMessage(), 30, 30);
  }


  try {
    // setup camera
    println("starting up camera...");
    camera.enableDepthStream(WIDTH, HEIGHT);
    camera.enableColorizer(ColorScheme.WhiteToBlack);
    camera.addDecimationFilter(DECIMATION);
    //camera.enableColorStream(640, 480);
    // filters
    camera.addTemporalFilter();
    camera.addHoleFillingFilter();
    camera.enableAlign();
    // set distance filter (in meters)
    thresholdFilter = camera.addThresholdFilter(lowDistance, highDistance);
    camera.start();
    camera.readFrames();
    cameraRunning = true;
  }
  catch (Exception ex) {
    fill(255);
    textSize(20);
    text("Error starting up: " + ex.getMessage(), 30, 30);
  }

  try {
    println("number devices available: "+RealSenseCamera.isDeviceAvailable());
  }
  catch (Exception ex) {
    println("no camera available, sending default image");
    cameraRunning = false;
  }

  opencv = new OpenCV(this, floor((WIDTH / DECIMATION)*cropWidth), floor((HEIGHT / DECIMATION) *cropHeight));  

  println("Sending data on: ws://localhost:" + PORT + "/");

  // GUI
  cp5 = new ControlP5(this);
  range = cp5.addRange("rangeController")
    // disable broadcasting since setRange and setRangeValues will trigger an event
    .setBroadcast(false)
    .setPosition(20, height-40)
    .setSize(floor(width*0.8), 20)
    .setHandleSize(20)
    .setRange(minDistance, maxDistance)
    .setRangeValues(lowDistance, highDistance)
    // after the initialization we turn broadcast back on again
    .setBroadcast(true)
    .setColorForeground(color(255, 40))
    .setColorBackground(color(255, 40));
  cp5.setFont(createFont("Courier", 10));
  defualtFrame = createImage(WIDTH / DECIMATION, HEIGHT / DECIMATION, RGB);
  animationFrame(defualtFrame);
}

void draw() {
  background(55);

  PImage depth = getDepthImage();
  PImage depthCrop = depth.get(floor(depth.width*cropX), floor(depth.height*cropY), floor(depth.width*cropWidth), floor(depth.height*cropHeight));   
  stroke(0,255,0);
  image(depth, 0, 0, width, height); // need to fix this to match blobY and blobHeight
  line(0,floor(height*cropY),width,floor(height*cropY));
  line(0,floor(height*cropY)+floor(height*cropHeight),width,floor(height*cropY)+floor(height*cropHeight));
  
  line(floor(width*cropX),0,floor(width*cropX),height);
  line(floor(width*cropX)+floor(width*cropWidth),0,floor(width*cropX)+floor(width*cropWidth),height);
  
  // send image over websocket
  if (cameraRunning) {
    blobTracking(depthCrop);
    drawBlobs(depthCrop);
    push();
    translate(floor(width*cropX),floor(height*cropY));
    stroke(0, 255, 0);
    circle(singlePointAverage.x*depthCrop.width*DECIMATION, singlePointAverage.y*depthCrop.height*DECIMATION, singlePointAverage.z);
    pop();
  } else {
    singlePointAverage.y = .5;
    singlePointAverage.x = sin(radians(frameCount))*0.3+0.5;
    singlePointAverage.z = 10.0;
    noStroke();
    fill(0, 255, 0);
    circle(singlePointAverage.x*width, singlePointAverage.y*height, singlePointAverage.z);
  }
  sendPImage(depth, singlePointAverage, trackingAtive);
  // display information
  fill(55, 100);
  noStroke();
  rect(0, 0, width, 100);
  fill(255);
  textSize(20);
  text("Image Size: " + depth.width + " x " + depth.height, 30, 30);
  text("Serving: ws://localhost:" + PORT + "/", 30, 60);
  text("trackingAtive: " + trackingAtive + "", 30, 90);
  surface.setTitle("Realsense 2 WebSocket - " + round(frameRate) + " FPS");
}

PImage getDepthImage() {
  if (cameraRunning) {
    camera.readFrames();
    return camera.getDepthImage();
  } else {
    animationFrame(defualtFrame);
    return defualtFrame;
  }
}

void drawBlobs(PImage depthImage) {

  PVector point = new PVector(0.5, 0.5, 0.01);//  set the point to middle of tracking area
  if (contours.size() > 0) {
    trackingAtive = true; 
    float xAverage = 0;
    float yAverage = 0;
    float zAverage = 0;
    int count = 0;
    for (int i = 0; i<contours.size(); i++) {
      Contour biggestContour = contours.get(i);
      Rectangle r = biggestContour.getBoundingBox();
      // adjust for image resolution 
      float rx = r.x * DECIMATION;
      float ry = r.y * DECIMATION;
      //ry += cropY*depthImage.height; 
      float rw = r.width * DECIMATION;
      float rh = r.height * DECIMATION;
      float diameter = (float)(rw+rh)/2; // todo: make this scalable 
      if (diameter >= 100) {
        //blob outer
        push();
        translate(floor(width*cropX),floor(height*cropY));
        noFill();
        strokeWeight(4);
        stroke(255, 0, 0);
        rect(rx, ry, rw, rh);
        //fill(30, 100, 100);
        //blob center
        // single point
        float x = rx + rw/2;
        float y = ry + rh/2;
        float z = (rw / r.width); // somewhat arbitrary division
        stroke(255, 0, 0);
        circle(x, y, z);
        pop();
        // normalize all values
        x = x / depthImage.width;
        y = y / depthImage.height;
        xAverage += x / DECIMATION;
        yAverage += y / DECIMATION;
        zAverage += z / DECIMATION;
        count++;
      }
    }  
    if (count>0) {
     // there is more than one person! 
      xAverage = xAverage/count;
      yAverage = yAverage/count;
      zAverage = zAverage/count;
      point.set(xAverage, yAverage, zAverage);
    //  stroke(255, 255, 0);
     // circle(point.x*depthImage.width, point.y*depthImage.height, point.z);
      filterRatio = 0.95;
    } else {
      // no blobs found
      trackingAtive = false; 
      filterRatio = 0.98;
    }
  } 
 
  /* calculate moveing weighted average of blobs */
  singlePointAverage.mult(filterRatio);
  singlePointAverage.add(point.mult(1-filterRatio));
}
void blobTracking(PImage depthImage) {
  try {
    PImage trackImage = depthImage;
    opencv.loadImage(trackImage);
    opencv.contrast(1.3f);
    opencv.dilate();
    opencv.blur(5);
    opencv.erode();
    opencv.erode();
    opencv.erode();
    contours = opencv.findContours(true, true);
  } 
  catch(Throwable ex) {
    System.err.println("Error: " + ex.getMessage());
    ex.printStackTrace();
  }
}

void animationFrame(PImage frame) {
  // simple animation when no camera found
  frame.loadPixels();
  for (int i = 0; i < frame.pixels.length; i++) {
    int x = i % frame.width;
    int y = (i - x) / frame.height;
    float reactorDistance = dist(x,y,width/2,height/2);
    int myStartTime = int(frameCount-reactorDistance);
    float angle = radians(myStartTime)*1.5;
    int fill = floor(sin(angle)*127)+127;  
    fill = constrain(fill,0,255);
    frame.pixels[i] = color(fill, fill, fill, 255);
  }
  frame.updatePixels();
}
