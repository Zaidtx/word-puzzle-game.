



document.addEventListener("DOMContentLoaded", function() {

  firebaseInit();


  launchTest();
 
});


const firebaseConfig = {
  apiKey: "AIzaSyBriYEsnpax18nummPt1PEm5rN6qD0qxx8",
  authDomain: "forclasse-7f050.firebaseapp.com",
  databaseURL: "https://forclasse-7f050.firebaseio.com",
  projectId: "forclasse-7f050",
  storageBucket: "forclasse-7f050.appspot.com",
  messagingSenderId: "1001175965488",
  appId: "1:1001175965488:web:6923c8aca42b8251e732f5"
};

var loadedPuzzle = null;

function firebaseInit() {
 
  firebase.initializeApp(firebaseConfig);

  console.log("DB root: " + firebase.database().ref());
}

async function launchTest() {

  firebase.database().ref("users").set({});


  await addUser('test_user_1');

  let users = await readAllUsers();
  console.log("users: " + JSON.stringify(users));

  
  let puzzle = getSamplePuzzle1();

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

  //start countdown
  var timeleft = 10;
  var downloadTimer = setInterval(function() {
      timeleft--;
      document.getElementById("countdowntimer").textContent = timeleft;
      
      
      if(Array.from(loadedPuzzle.words.keys()).filter(function(key){ return !loadedPuzzle.words.get(key); }).length == 0) {
        clearInterval(downloadTimer);
        console.log("user found all words!!!");
      }

     
      if(timeleft <= 0) {
        clearInterval(downloadTimer);
        console.log("user ran out of time :(");
        
      }
  }, 1000);
}

async function addPuzzle(username, puzzle) {
  let userRef = firebase.database().ref("users/" + username + "/puzzles");

  await userRef.push().set(puzzle);
}

function getSamplePuzzle1() {
  var words = new Map();
  words.set('houston', true);
  words.set('austin', true);
  words.set('dallas', true);
  words.set('newyork', true);
  words.set('miami', true);
  words.set('chicago ', true);
  words.set('jordan', true);
  words.set('lebanon', true);
  words.set('dubai', true);
  words.set('iraq', true);
  words.set('texas', true);
  words.set('kuwait', true);

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
      'ATOHEL',
      'UNUOOA',
      'SANUTB',
      'TISSMM',
      'IGATFY',
      'NCIOHC' ,
      'MNKNOKP'
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
    queryParams.search_words = startGame + "10";
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