// above each function i added an Explanation of what we did and to whom api is. 
// used two api's. one for giphy, and one for oxford. 
// used new tech which is fire base. 
// didn't use an alert. instead we used giphy so view a picture when you win or lose. 
// event listener that fires when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Firebase init
  firebaseInit();

  launchTest();
  
});

// line 10 until 39 we're calling our Firebase and giphy api's 
//zaid's firebase api 

//constants
const firebaseConfig = {
  apiKey: "AIzaSyBriYEsnpax18nummPt1PEm5rN6qD0qxx8",
  authDomain: "forclasse-7f050.firebaseapp.com",
  databaseURL: "https://forclasse-7f050.firebaseio.com",
  projectId: "forclasse-7f050",
  storageBucket: "forclasse-7f050.appspot.com",
  messagingSenderId: "1001175965488",
  appId: "1:1001175965488:web:6923c8aca42b8251e732f5"
};

//globals
// null means no value in javascript 
var loadedPuzzle = null;
var userScore = 0;
var mouseDownLetter = null;
var mouseUpLetter = null;
var mouseInputLetters = [];
var giphyAPIKey = 'tbz114zIETMv2GysLCNE0JPkNkinaaND'; //makah's api key. FIRST API

function firebaseInit() {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log("DB root: " + firebase.database().ref());
}
//// async function "https://www.codingame.com/playgrounds/7429/asynchronous-code-with-asyncawait" i read it's best to use it in games. 

async function launchTest() {
  
  firebase.database().ref("users").set({});

  //add test user 1
  await addUser('test_user_1');
  // addUser('test_user_2');

  //DEBUG - read all users
  let users = await readAllUsers();
  console.log("users: " + JSON.stringify(users));

  //generate a new puzzle for test_user_1
  let puzzle = getSamplePuzzle1();
  
  //launch sample puzzle (  //makes  a new puzzle for test_user 1)
  await launchNewPuzzle('test_user_1', puzzle);
}
//// what async do is it always returns or promises to return a value. 
async function launchNewPuzzle(username, puzzle) {  
  //add to user
  addPuzzle(username, puzzle);

  //assigne puzzle to global variable for reference during game
  loadedPuzzle = puzzle;

  //DEBUG - read all users
  /// the await  expression causes async function execution to pause until a Promise is settled ( google Explaination ) 
  let users = await readUserByUsername(username);
  console.log("user: " + JSON.stringify(users));

 // so Basically what json.stringify do is: converts a JavaScript object or value to a JSON string.
  // also its a JS object but if it was already JSON it would have been JSON.parse() 

  //launch puzzle
  // the puzzle itself with the rows and colms 
  let letterDiv = null;
  for(let i = 0; i < puzzle.rows.length; i++) {
    for(let j = 0; j < puzzle.rows[i].length; j++) {
      letterDiv = document.createElement('div');
      letterDiv.className = 'puzzle-letter';
      letterDiv.setAttribute('id', 'puzzleLetter_' + i + '_' + j);
      letterDiv.innerHTML = puzzle.rows[i][j];
      document.getElementById('puzzle').appendChild(letterDiv);
    }
  }
// so what we did here was we added a for loop fand a div or the words then so it can be Displaied. 
  let wordDiv = null;
  let words = Array.from(puzzle.words.keys());
  for(let i = 0; i < words.length; i++) {
    wordDiv = document.createElement('div');
    wordDiv.setAttribute('id', 'puzzleWord_' + i);
    wordDiv.innerHTML = words[i];
    document.getElementById('wordBankWords').appendChild(wordDiv);// word bank is where the words are gonna be in. 
  }

   //set up mouse listening for user word input
  // mouse-down 104-107
  // used https://www.w3schools.com/jsref/event_onmousedown.asp
  $("body").find(".puzzle-letter").on('mousedown', function(){
    console.log("mouse down on letter: " + $(this).html() + ", id: " + $(this).prop('id'));
    //update global
    mouseDownLetter = $(this);
  });
// // its the same as mousedown but this is mouse-up
  //"https://www.w3schools.com/jsref/event_onmouseup.asp" 
  // had some help with the mouse function because it wouldn't work. 
  $("body").find(".puzzle-letter").on('mouseup', function(){
    if(mouseDownLetter == null) { return; }
    console.log("mouse up on letter: " + $(this).html() + ", id: " + $(this).prop('id'));
    //update global
    mouseUpLetter = $(this);

    //get resulting word from mouse up/down letters
    let inputWord = getWordFromMouseLetterDivs();
    //send word for processing
    processUserWordInput(inputWord);
    //clear mouse letters
    mouseDownLetter = null;
    mouseUpLetter = null;
  });

  //start game timer
  var timerSeconds = 90;
  var gameTimer = setInterval(function() {
      timerSeconds--;
      let timerMinutes = Math.floor(timerSeconds / 60);
      let timerMinutesFormat = timerMinutes.toFixed(0);
      if(timerMinutes < 10) {
        timerMinutesFormat = "0" + timerMinutesFormat;
      }
      let timerSecondsFormat = timerSeconds % 60;
      if(timerSeconds % 60 < 10) {
        timerSecondsFormat = "0" + timerSecondsFormat;
      }
      let timerFormat = timerMinutesFormat + ":" + timerSecondsFormat;
      document.getElementById("timer").textContent = timerFormat;
      
      //detect win - if all words are true (found) then stop timer and display overlay
       // so if the user finds the words before the time it up it should console he found them 
      if(Array.from(loadedPuzzle.words.keys()).filter(function(key){ return !loadedPuzzle.words.get(key); }).length == 0) {
        clearInterval(gameTimer);
        console.log("user found all words!!!");

        //show ui overlay
        document.getElementById('container').className = "disabler";
        document.getElementById('puzzleOver').hidden = false;
        document.getElementById('youWin').hidden = false;
        
        //use giphy to display random image with victory overlay
        // // api key to display an image if he won. 
        let query = `?api_key=${giphyAPIKey}&q=congratulations+you+win&rating=g&lang=en&limit=100`;
        $.ajax({url: "http://api.giphy.com/v1/gifs/search"+query, success: function(result){
          //get url result
          let imageURL = JSON.stringify(result.data[Math.floor(Math.random() * 101)].images.downsized.url);
          console.log("url: " + imageURL);
          $("#youWinImage").prop('src', JSON.parse(imageURL));
        }});
      }

      //detect lose - ran out of time without winning (above)
      // same as above but this time the user ran out of time so he'll loose. also he;s gonna get an api image saying he lost. 
      if(timerSeconds <= 0) {
        clearInterval(gameTimer);
        console.log("user ran out of time");
        
        //show ui overlay
        document.getElementById('container').className = "disabler";
        document.getElementById('puzzleOver').hidden = false;
        document.getElementById('youLose').hidden = false;

        //use giphy to display random image with loss overlay
        let query = `?api_key=${giphyAPIKey}&q=you+lose&rating=g&lang=en&limit=100`;
        $.ajax({url: "http://api.giphy.com/v1/gifs/search"+query, success: function(result){
          //get url result
          let imageURL = JSON.stringify(result.data[Math.floor(Math.random() * 101)].images.downsized.url);
          console.log("url: " + imageURL);
          $("#youLoseImage").prop('src', JSON.parse(imageURL));
        }});
      }
  }, 1000);
}
// this website help with these event "https://w3c.github.io/uievents/#event-type-mousedown"

function getWordFromMouseLetterDivs() {
  // so bascially what PROP does it returns the first matched element 
  // also the  split() method is used to split a string into an array of substrings, and returns the new array.
  // example of split is https://www.w3schools.com/jsref/jsref_split.asp
  let mouseDownLetterRow = Number(mouseDownLetter.prop('id').split("_")[1]);
  let mouseDownLetterCol = Number(mouseDownLetter.prop('id').split("_")[2]);
  let mouseUpLetterRow = Number(mouseUpLetter.prop('id').split("_")[1]);
  let mouseUpLetterCol = Number(mouseUpLetter.prop('id').split("_")[2]);
// also what one of the mouse up/ down event is you get to pick the color you want when you press the text or div whatever. 
   //clear mouse letters
mouseDownLetter = null;
  mouseUpLetter = null;
  mouseInputLetters = [];

 //TODO list if we have more time // mouse from slack it says console.log letter divs after we create them. 
    
  // todo if we have time ---> add divs to mouseInputLetters
  

  let row = mouseDownLetterRow;
  let col = mouseDownLetterCol;
  // the mouse Currently only works if you find the word, but if you put it on any word it won't work. 
  while((mouseDownLetterRow <= mouseUpLetterRow ? row <= mouseUpLetterRow : row >= mouseUpLetterRow) && 
      (mouseDownLetterCol <= mouseUpLetterCol ? col <= mouseUpLetterCol : col >= mouseUpLetterCol)) {
    mouseInputLetters.push($("#puzzleLetter_" + row + "_" + col));
    row = row + (mouseDownLetterRow < mouseUpLetterRow ? 1 : mouseDownLetterRow > mouseUpLetterRow ? -1 : 0);
    col = col + (mouseDownLetterCol < mouseUpLetterCol ? 1 : mouseDownLetterCol > mouseUpLetterCol ? -1 : 0);
   
  }

  let inputWord = mouseInputLetters.map(function(letterDiv) { return letterDiv.html(); }).join("");
// what MAP does is creates a new array with the results of calling a function for every array element
  console.log("input word: " + inputWord);
  return inputWord;
}

function processUserWordInput(userWord) {

  //check if valid word
  // as i mentioned on line 236 every time the user finds a word his score will go up by 10 points. 
  let keys = Array.from(loadedPuzzle.words.keys());
  if(keys.includes(userWord.toUpperCase()) && !loadedPuzzle.words.get(userWord.toUpperCase())) {
    //add 10 points to user score
    updateUserScore(10);
    //mark word as found in puzzle/Map
    loadedPuzzle.words.set(userWord.toUpperCase(), true);
    //mark word as found in UI //// which means every time you find a word its gonna be marked also in the words bank
    for(let i = 0; i < $('#wordBankWords').children().length; i++) {
      if($('#wordBankWords').children()[i].innerHTML == userWord.toUpperCase()) {
        $($('#wordBankWords').children()[i]).addClass('found-word');
      }
    }
    //mark letters in UI
    mouseInputLetters.forEach(function(div) {
      div.addClass('found-word-letter');
    })
  }
}
// how the score is Calculated. every time you find a word you add to your score 10 points. its Mentioned at line 220 i think !

function updateUserScore(additionalPoints) {
  userScore += additionalPoints;
  $('#score').text(userScore);
}

async function addPuzzle(username, puzzle) {
  let userRef = firebase.database().ref("users/" + username + "/puzzles");

  await userRef.push().set(puzzle);
}
// our words " might change of we have time "
// we change the word from houston, austin ...  Because we had to build the puzzle which was making it very hard with long words. 
// so we looked up easy words for search games. 

function getSamplePuzzle1() {
  var words = new Map();
  words.set('AIR', false);
  words.set('BOW', false);
  words.set('CHOICE', false);
  words.set('CYMBAL', false);
  words.set('FUNNY', false);
  words.set('GIANT', false);
  words.set('LUNG', false);
  words.set('MUSIC', false);
  words.set('PAGE', false);
  words.set('TOE', false);
  words.set('TOWEL', false);
  words.set('TUMMY', false);
// how the puzzle is set up 
  return {
    id: 'sample1',
    rows: [
      'YTOWEL',
      'GNULOA',
      'RANMTB',
      'CISUMM',
      'EGAPFY',
      'ECIOHC'
    ],
    words: words
  }
}


function getGeneratedPuzzle() {
  return {};
}

async function addUser(username) {
    let userRef = firebase.database().ref("users");

    await userRef.push().set({
      username: username
    });

    //DEBUG
    console.log("userRef location: " + userRef.toString());
}

async function readAllUsers() {
  let snapshotPromise = await firebase.database().ref("users").once('value');
  return snapshotPromise;
}

async function readUserByUsername(username) {
  let snapshotPromise = await firebase.database().ref("users/"+username).once('value');
  return snapshotPromise;
}