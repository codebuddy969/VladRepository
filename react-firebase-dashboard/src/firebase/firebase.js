import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCqh0eNWXDBbg6ljkvxH613wpW7ALQdrwA",
    authDomain: "testing-d2adc.firebaseapp.com",
    databaseURL: "https://testing-d2adc.firebaseio.com",
    projectId: "testing-d2adc",
    storageBucket: "testing-d2adc.appspot.com",
    messagingSenderId: "853012107439"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth, };