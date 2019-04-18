import firebase from 'firebase'

export default ({ app }, inject) => {

  // console.log({ app })

  firebase.initializeApp({
    apiKey: "AIzaSyBrtHf3EU8BsbLQL-sWLlH1D0bL0s-TJcY",
    authDomain: "britecore-frontend.firebaseapp.com",
    databaseURL: "https://britecore-frontend.firebaseio.com",
    projectId: "britecore-frontend",
    storageBucket: "britecore-frontend.appspot.com",
    messagingSenderId: "844974468716"
  });

  inject('DB', firebase.database())
}
