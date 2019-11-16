



document.addEventListener("DOMContentLoaded", function() {

  firebaseInit();


  launchTest();
 
});
// firbase configration

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
var loadedPuzzle = null;
var userScore = 0;
var mouseDownLetter = null;
var mouseUpLetter = null;
var mouseInputLetters = [];
var giphyAPIKey = 'tbz114zIETMv2GysLCNE0JPkNkinaaND';



function firebaseInit() {
 
  // Initialize the Firbase
  firebase.initializeApp(firebaseConfig);

  console.log("DB root: " + firebase.database().ref());
}

async function launchTest() {

  firebase.database().ref("users").set({});

//add test user 1
  await addUser('test_user_1');

  //DEBUG
  let users = await readAllUsers();
  console.log("users: " + JSON.stringify(users));

   //makes  a new puzzle for test_user 1
  let puzzle = getSamplePuzzle1();

  
  //launch sample puzzle
  await launchNewPuzzle('test_user_1', puzzle);
}

async function launchNewPuzzle(username, puzzle) {  
  //add to user
  addPuzzle(username, puzzle);

 
  loadedPuzzle = puzzle;


  let users = await readUserByUsername(username);
  console.log("user: " + JSON.stringify(users));

  //launch puzzle
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

  let wordDiv = null;
  let words = Array.from(puzzle.words.keys());
  for(let i = 0; i < words.length; i++) {
    wordDiv = document.createElement('div');
    wordDiv.setAttribute('id', 'puzzleWord_' + i);
    wordDiv.innerHTML = words[i];
    document.getElementById('wordBankWords').appendChild(wordDiv);
  }

//

//set up mouse listening for user word input
$("body").find(".puzzle-letter").on('mousedown', function(){
  console.log("mouse down on letter: " + $(this).html() + ", id: " + $(this).prop('id'));
  //update global
  mouseDownLetter = $(this);
});

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


async function addPuzzle(username, puzzle) {
  let userRef = firebase.database().ref("users/" + username + "/puzzles");

  await userRef.push().set(puzzle);
}

function getSamplePuzzle1() {
  var words = new Map();
  words.set('houston');
  words.set('austin');
  words.set('air');
  words.set('ball');
  words.set('hat');
  words.set('car ');
  words.set('dubai');
  words.set('iraq');
  words.set('cat ');


  // for (let i = 0; i < words.length; i++) {
    for (word of words){
      console.log(word)
      const a = $("<div>");
      a.addClass("words");
      a.text(word);
      $("#words").append(a);
    }

      
    
  // }

  return {
    id: 'sample1',
    rows: [
      'AIRHELK',
      'UTUTDAC',
      'SBALUBD',
      'TCSHBMU',
      'ASAHAIB',
      'ICIRICR' ,
      'NOTSUOHLCAQARI'
    ],
    words: words
  }
}

// not done
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

function buildQueryURL() {
  
  const queryURL = "https://od-api.oxforddictionaries.com/api/v2";

  
  const queryParams = { "api-key": "632299bb4f685bac7a7e615a2459ce3e" };

  
  queryParams.q = $("#search-words")
    .val()
    .trim();

    
    $.ajaxSetup({
      headers: { '93ed2487': '632299bb4f685bac7a7e615a2459ce3e' }
    });

    
    const startGame = $("#start-game")
    .val()
    .trim();

  if (parseInt(startGame)) {
    queryParams.search_words = startGame + "60";
  }


(function() {


$("#btnLogin").on("click", function (event) {
  event.preventDefaulf();

const user = $("#enter-username").val().trim();
const pass = $("#enter-password").val().trim();

var newUser = {
    user: user,
    password: pass,


}

// adding user to firebase

  database.ref().push(newUser);

  $("#enter-username").val("");
  $("#enter-password").val("");



});


database.ref().on("child_added", function(childSnapshot) {

var username = childSnapshot.val().name;
var password = childSnapshot.val().pass;

console.log("user name" +name)

})


  

 
})

}