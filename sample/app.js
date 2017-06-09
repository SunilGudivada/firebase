(function () {

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBjoTzycaK0K2It1zynEE_JfvngIpsQpgs",
    authDomain: "firstfirebase-97324.firebaseapp.com",
    databaseURL: "https://firstfirebase-97324.firebaseio.com",
    projectId: "firstfirebase-97324",
    storageBucket: "firstfirebase-97324.appspot.com",
    messagingSenderId: "225121138459"
  };
  firebase.initializeApp(config);

    var preObject = document.getElementById('object');
    var preList = document.getElementById('list');
    // Create reference 
    var dbRefObject = firebase.database().ref().child('Details');


    // Sync object changes
    dbRefObject.on('value', function (snap) {
        preObject.innerText = JSON.stringify(snap.val(), null , 3 ); 
    });


    var childdbRefObject = dbRefObject.child('name');
    // Sync List changes
    childdbRefObject.on('value' , function (snap){
        var li = document.createElement(li);
        li.innerText = JSON.stringify(snap.val(), null , 3 );
        preList.append( li );

    })


    //Event Elements 
    const objEmail = document.getElementById('email');
    const objPass = document.getElementById('password');

    const btnLogin = document.getElementById('login');
    const btnLogout = document.getElementById('logout');
    const btnSignup = document.getElementById('signin');

    //Add login Listener
    btnLogin.addEventListener('click', e => {

        const email = objEmail.value;
        const pass = objPass.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword( email, pass );

        promise.catch(e => console.log(e.message));
    });

    //Add SignUp listener
     btnSignup.addEventListener('click', e => {

        const email = objEmail.value;
        const pass = objPass.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword( email, pass ).then(user => console.log(user)).catch(e => console.log(e.message));
    });


     //Add Logout listener
     btnLogout.addEventListener('click', e =>{
        firebase.auth().signOut();
        window.reload();
     })
     firebase.auth().onAuthStateChanged( firebaseUser => {
        if ( firebaseUser ){
             console.log('user logged in!..');
            btnLogout.classList.remove('hide'); 
            btnLogin.classList.add('hide');           
            btnSignup.classList.add('hide');           
        }else{
            console.log('user logged Out!..');
            btnLogout.classList.add('hide');
       }
     });


})();