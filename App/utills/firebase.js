import firebase from "firebase/app";

const firebaseConfig ={
  apiKey: "AIzaSyBBrljpPa54AOX6TqMgOMhd8j_vOOSwt9E",
      authDomain: "rapidin-0.firebaseapp.com",
      databaseURL: "https://rapidin-0.firebaseio.com",
      projectId: "rapidin-0",
      storageBucket: "rapidin-0.appspot.com",
      messagingSenderId: "445247136725",
      appId: "1:445247136725:web:da4c357a6d0a98d397135c",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
