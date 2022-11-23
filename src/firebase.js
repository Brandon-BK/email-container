import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyD-GaM4yXaTPIgrnr5TJ4EUh8uJXvAaA4k",
    authDomain: "email-container-178d5.firebaseapp.com",
    projectId: "email-container-178d5",
    storageBucket: "email-container-178d5.appspot.com",
    messagingSenderId: "235272334677",
    appId: "1:235272334677:web:80db443923bbc8aac0d3dc"
  };

  const fireDb = firebase.initializeApp(firebaseConfig)
  export default fireDb.database().ref()