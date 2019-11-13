


  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBriYEsnpax18nummPt1PEm5rN6qD0qxx8",
    authDomain: "forclasse-7f050.firebaseapp.com",
    databaseURL: "https://forclasse-7f050.firebaseio.com",
    projectId: "forclasse-7f050",
    storageBucket: "forclasse-7f050.appspot.com",
    messagingSenderId: "1001175965488",
    appId: "1:1001175965488:web:6923c8aca42b8251e732f5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  console.log(firebase)


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













 


  

 

