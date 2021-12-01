
// osc
const port = 8025;
const osc = new OSC();

function setupOSC() {
  position = createVector(0, 0, 0);
  // init buffer
  // depthImage = createImage(160, 120);

  // setup OSC receiver
  osc.on('/depth', msg => {
    updateDepthImage(msg);
  }
  );

  try {
    osc.open( {
    port:
      port
    }
    );
  }
  catch (e) {
    console.log("Could not connect: " + e);
  }
}

function updateOSC() {
  // reconnect osc
  if (osc.status() === OSC.STATUS.IS_CLOSED) {
    console.log("reconnecting...");
    osc.open( {
    port:
      port
    }
    );
  }
}

function updateDepthImage(msg) {
  w = msg.args[0];
  h = msg.args[1];
  position.x = msg.args[3];
  position.y = msg.args[4];
  position.z = msg.args[5];
    data = msg.args[2];
  /* weighted moving average on every point*/
  try {
    let depthLength = w * h;
    for (let i = 0; i<depthLength; i++) {
        //let index = (i*w)+j;
       dataFiltered[i] = int(dataFiltered[i]*0.9);
       dataFiltered[i] += int(data[i]*0.1);
    }
  } catch(e) {
    console.log("data not defined yet");
    dataFiltered = Array.from(msg.args[2]);
  }

  //
  // uncomment to recreate image
  //
  //// check if buffer size is valid
  //if (depthImage.width !== w || depthImage.height !== h) {
  //  console.log("buffer has been reinitialized");
  //  depthImage = createImage(w, h);
  //}

  //// copy data
  //depthImage.loadPixels();

  //for (let i = 0; i < depthImage.pixels.length / 4; i++) {
  //  let di = i * 4;
  //  depthImage.pixels[di] = data[i];
  //  depthImage.pixels[di+1] = data[i];
  //  depthImage.pixels[di+2] = data[i];
  //  depthImage.pixels[di+3] = data[i];
  //}
  //depthImage.updatePixels();
}
