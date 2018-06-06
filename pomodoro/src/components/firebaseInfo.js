import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBwArX-pn0ctOAs2LGMJPPUgf4AVBD2jrc",
    authDomain: "pomodorotimerr.firebaseapp.com",
    databaseURL: "https://pomodorotimerr.firebaseio.com",
    projectId: "pomodorotimerr",
    storageBucket: "",
    messagingSenderId: "455549070062"
  };

const fire = firebase.initializeApp(config);
export default fire;