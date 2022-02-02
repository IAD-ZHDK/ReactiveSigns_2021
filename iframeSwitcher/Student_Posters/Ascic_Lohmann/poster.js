//
// sketch.js
// Ascic_Lukman-Lohmann_Audrey
// 
// Created by Lukman Aščić on 14.12.21.
// Copyright © 2021 Lukman Ascic. All rights reserved.
//

let animationManager;
let assetManager;

function preload() {
  assetManager = new AssetManager();
  assetManager.prepare();
}

function setup() {
  createCanvas(getWindowWidth(), getWindowHeight());
  
  animationManager = new AnimationManager(assetManager.renderImages, assetManager.leftImages, assetManager.rightImages, false);
  setupOSC(false);
  noCursor();
}

function draw() {
  background(0);
 // newVectorNormal = getSmoothPlayBackVector(position)
  animationManager.displayRenderImagesWith(posNormal, width, height);
  //animationManager.displayMousePointerWith(position);
  animationManager.checkIfStayingOn(posNormal, frameCount, width, height);
  posterTasks();
}

let lastVector;
let DragVector;
let playBackFlag = false;
let velocityAverage = 0;

function getSmoothPlayBackVector(vector) {

  if (typeof DragVector === 'undefined') {
    DragVector = createVector(0,0);
    lastVector = createVector(0,0);
  }
 
      let velocity = abs(lastVector.x-vector.x);
      velocityAverage = velocityAverage*0.95
      velocityAverage += velocity*0.05
       let difference = abs(DragVector.x-vector.x);

        let delta = map(velocityAverage,1.8,15.0,1.0,0.75, true);

        if (difference >= width/20) {
          playBackFlag = true;
        }
        if (difference <= width/400) {
          playBackFlag = false;
        }
        if (playBackFlag) {
          delta = 0.91
        }
        DragVector.y = vector.y;
        DragVector.x = DragVector.x*delta;
        DragVector.x += vector.x*(1.0-delta);
        lastVector.x = vector.x
        lastVector.y = vector.y
        tempVector = createVector(DragVector.x/width,DragVector.y/height)
        return tempVector;
}
