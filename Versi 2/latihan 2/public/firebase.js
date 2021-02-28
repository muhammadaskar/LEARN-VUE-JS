
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB_x5WodjNwOd4CI8xanigW2Tz5bvkJk-8",
    authDomain: "belajar-vuejs-b710c.firebaseapp.com",
    databaseURL: "https://belajar-vuejs-b710c-default-rtdb.firebaseio.com/",
    projectId: "belajar-vuejs-b710c",
    storageBucket: "belajar-vuejs-b710c.appspot.com",
    messagingSenderId: "1016431371760",
    appId: "1:1016431371760:web:5beee017c36c6fc5b82935"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database()
const kelasRef =  db.ref('kelas')