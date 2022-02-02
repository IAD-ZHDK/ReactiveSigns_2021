let parent = 'Student_Posters/'
let indexFile ='/index.html'
let posters = ['Buenzli_Good','Ascic_Lohmann','Janthasom_Hommel','Leon_Cowley','Naegeli_Ziegler','Praxmarer_Landolt','Walther_Bischoff', 'Muniz_Eggstein2D']
let posterCount = 0
let intervalTime = 180000; //3 minutes s
let trackingActive = false;



function trackingCallback(tracking) {
  trackingActive = tracking
}

function changePoster() {
  let newPosterURL = parent+''+posters[posterCount]+''+indexFile
  console.log(newPosterURL);
  document.getElementById('posterFrame').src = newPosterURL;
  if (posterCount < posters.length-1) {
    posterCount++;
  } else {
    posterCount = 0;
  }
  let fader = document.getElementById('fader');
  fader.classList.toggle('fadein');
}

function pickPoster(number) {
  // for keyboard selection during testing
  console.log("poster no: "+number)
  if (number-1 < posters.length-1 && number-1 >= 0) {
    posterCount = number-1;
    //changePoster() 
    transition()
  }
}

function transition() {
  try {
    let iframe = document.getElementById('posterFrame');
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    let fader = iframeDocument.getElementById('loader');
    fader.classList.toggle('fadeout');
  }   catch(e) {
  }
 setTimeout(changePoster, 2000);
}

function intervalHandler(){
   if (trackingActive == false || typeof trackingActive === 'undefined') {
    clearInterval(myInterval);
    myInterval = setInterval(intervalHandler, intervalTime)
    //changePoster()
    transition()
   } else {
    // skip change if someone is in front of poster, try again after delay 
    clearInterval(myInterval);
    myInterval = setInterval(intervalHandler, 700);
    //console.log("tracking: "+ trackingActive);
   }
}

let myInterval = setInterval(intervalHandler, 400); 



//document.addEventListener('keypress', pickPoster, true);
