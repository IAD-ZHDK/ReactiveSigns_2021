let parent = 'Student_Posters/'
let indexFile ='/index.html'
let posters = ['Buenzli_Good','Ascic_Lohmann','Janthasom_Hommel','Leon_Cowley','Naegeli_Ziegler','Praxmarer_Landolt','Walther_Bischoff', 'Muniz_Eggstein']
let posterCount = 0

function changePoster() {
  let newPosterURL = parent+''+posters[posterCount]+''+indexFile
  console.log(newPosterURL);
  document.getElementById('posterFrame').src = newPosterURL;
  if (posterCount < posters.length-1) {
    posterCount++;
  } else {
    posterCount = 0;
  }
}

function pickPoster(number) {
  //var number = event.key;
  // Alert the key name and key code on keydown
  console.log(number)
  if (number-1 < posters.length-1 && number-1 >= 0) {
    posterCount = number-1;
    changePoster()
  }
}

setInterval(changePoster, 70000);

//document.addEventListener('keypress', pickPoster, true);
