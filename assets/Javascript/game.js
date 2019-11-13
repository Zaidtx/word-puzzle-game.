
(function() {

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

  console.log(firebase)



 

  const txtEmail = $('#txtEmail');
  const txtPassword = $('#txtPassword');
  const btnLogin = $('#btnLogin');
  const btnSignUp = $('#btnSignUp');
  const btnLogout = $('#btnLogout');

  // add login event

btnLogin.addEventListner('click', e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

// sign in

const promise = auth.signInWithEmailAndPassword(email,pass);

promise.catch(e => console.log(e.message));

});





}());

  
  
  

  apiKey="tbz114zIETMv2GysLCNE0JPkNkinaaND"
  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=apikey&limit=5");
  4xhr.done(function(data) { console.log("success got data", data); });

