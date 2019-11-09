


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
  function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
  }