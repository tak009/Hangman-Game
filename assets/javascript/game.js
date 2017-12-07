// Initiate global variables
var winsCounter = 0;
var maxGuesses = 12;
var currentWord = "";
var lettersGuessedArr = [];
var answersArr = [];
var moviesArr = ["aladdin", "braves", "cars", "dinosaur", "frozen", "lava", "madagascar", "minions", "moana", "mulan", "pinocchio", "pocahontas", "ratatouille", "rango", "rio", "shrek", "sing", "tangled", "tarzan", "zootopia"];

var moviesObj = {
  aladdin: {img:"img_aladdin.jpg", song:"a_whole_new_world.mp3", title:"A Whole New World"},
  braves: {img:"img_braves.jpg", song:"touch_the_sky.mp3", title:"Touch The Sky"},
  cars: {img:"img_cars.jpg", song:"life_is_a_highway.mp3", title:"Life Is A Highway"},
  dinosaur: {img:"img_dinosaur.jpg", song:"the_egg_travels.mp3", title:"The Egg Travel"},
  frozen: {img:"img_frozen.jpg", song:"let_it_go.mp3", title:"Let It Go"},
  lava: {img:"img_lava.jpg", song:"lava.mp3", title:"Lava"},
  madagascar: {img:"img_madagascar.jpg", song:"i_like_to_move_it.mp3", title:"I Like To Move It"},
  minions: {img:"img_minions.jpg", song:"happy_together.mp3", title:"Happy Together"},
  moana: {img:"img_moana.jpg", song:"how_far_i_ll_go.mp3", title:"How Far I'll Go"},
  mulan: {img:"img_mulan.jpg", song:"reflection.mp3", title:"Reflection"},
  pinocchio: {img:"img_pinocchio.jpg", song:"when_you_wish_upon_the_star.mp3", title:"When You Wish Upon A Star"},
  pocahontas: {img:"img_pocahontas.jpg", song:"colors_of_the_wind.mp3", title:"Color of The Wind"},
  ratatouille: {img:"img_ratatouille.jpg", song:"le_festin.mp3", title:"Le Festin"},
  rango: {img:"img_rango.jpg", song:"welcome_amigo.mp3", title:"Welcome Amigo"},
  rio: {img:"img_rio.jpg", song:"i_wanna_party.mp3", title:"I Wanna Party"},
  shrek: {img:"img_shrek.jpg", song:"stay_home.mp3", title:"Stay Home"},
  sing: {img:"img_sing.jpg", song:"my_way.mp3", title:"My Way"},
  tangled: {img:"img_tangled.jpg", song:"i_see_the_light.mp3", title:"I See The Light"},
  tarzan: {img:"img_tarzan.jpg", song:"you_ll_be_in_my_heart.mp3", title:"You'll Be In My Heart"},
  zootopia: {img:"img_zootopia.jpg", song:"try_everything.mp3", title:"Try Everything"}
};

var displayWord = document.getElementById("display-word");
var displayGuessed = document.getElementById("dispay-guessed");
var displayRemaining = document.getElementById("dispay-remaining");
var displayWins = document.getElementById("display-wins");
var displaySongTitle = document.getElementById("display-song-title");
var displayImg = document.getElementById("display-img");
var gameButton = document.getElementById("game-button");
var pauseButton = document.getElementById("pause-button");
var audioElement = document.createElement("audio");
var imgElement = document.createElement("img");

var hangmanObj = {

};

// Load the game when the browser first loaded
window.addEventListener("load", function() {
  currentWord = chooseWord(moviesArr);
  pauseButton.style.visibility = 'hidden';
  displayRemaining.innerHTML = maxGuesses;
  displayWins.innerHTML = winsCounter;
});


document.addEventListener("keyup", function(event) {

  // Determine which key was pressed.
  var userGuess = event.key.toUpperCase();

  // Check if key already pressed exists in the array
  var isCorrectGuessed = lettersGuessedArr.indexOf(userGuess);
  var isCompleted = answersArr.indexOf("_");
console.log("isCorrectGuessed " + isCorrectGuessed);
console.log("isCompleted " + isCompleted);
  if (isCorrectGuessed === -1 && isCompleted !== -1 && maxGuesses > 0) {
    // Store capitalized letter in the lettersGuessed array
    lettersGuessedArr.push(userGuess);

  }
  else {
    return;
  }

  if(lettersGuessedArr.length <= maxGuesses){
    checkWord();
  }

  console.log("lettersGuessedArr - " + lettersGuessedArr.length);
  if(lettersGuessedArr.length <= maxGuesses) {
     displayRemaining.innerHTML = maxGuesses-lettersGuessedArr.length;
     displayGuessed.innerHTML = lettersGuessedArr;
  }
});


function chooseWord(arr) {
  // Select a current word from words array
  var word = arr[Math.floor(Math.random() * arr.length)];
  console.log(word + " - " + word.length);

  // Display underscores _ _ (string), number of underscores must match with number of letters in the selected word
  var answers = word.replace(/./g, "_ ");

  // Convert string to array --> ["_","_","_"]
  answersArr = answers.trim().split(" ");
  displayWord.setAttribute("class", "text-nondecor");
  displayWord.innerHTML = answers;

  return word;
}


function checkWord() {
  // Get the last letter guessed from the lettersGuessedArr
  var lastLetterGuessed = lettersGuessedArr[lettersGuessedArr.length - 1];

  // Check if the last letter guessed matches with any letter in the word
  for (var i = 0; i < currentWord.length; i++) {
    var capLetter = currentWord[i].toUpperCase();

    if (lastLetterGuessed === capLetter) {
      // Replace "_" by the correct letter e.g. ["_","_","_"] --> ["A","_","_"]
      answersArr[i] = answersArr[i].replace("_", capLetter);
      var correctAnswer = answersArr.join("");
      // Remove correct guessed letter from lettersGuessedArr
      lettersGuessedArr.pop(lastLetterGuessed);
    }
  }

  if (correctAnswer === currentWord.toUpperCase()) {
    console.log(correctAnswer + "  " + currentWord.length);
    winsCounter++;

    // Get image, song, and title from the movies object
    var image = moviesObj[correctAnswer.toLowerCase()].img;
    var song = moviesObj[correctAnswer.toLowerCase()].song;
    var title = moviesObj[correctAnswer.toLowerCase()].title;

    // Show image and play a song if user guesses correctly
    imgElement.setAttribute("src", "assets/images/" + image);
    imgElement.setAttribute("class", "img-responsive img-rounded center-block");
    audioElement.setAttribute("src", "assets/audios/" + song);
    audioElement.play();

    displayWord.setAttribute("class", "text-decor");
    displaySongTitle.innerHTML = title;
    displaySongTitle.setAttribute("class", "text-decor");
    displayImg.appendChild(imgElement);
    pauseButton.style.visibility = 'visible';
  }

  displayWord.innerHTML = answersArr.join(" ");
  displayWins.innerHTML = winsCounter;

}

gameButton.addEventListener("click", function() {
  // Reset all variables except winsCounter
  maxGuesses = 12;
  currentWord = "";
  lettersGuessedArr = [];
  answersArr = [];
  currentWord = chooseWord(moviesArr);
  displayRemaining.innerHTML = maxGuesses;
  displayGuessed.innerHTML = lettersGuessedArr;
});

pauseButton.addEventListener("click", function() {
  audioElement.pause();
});
