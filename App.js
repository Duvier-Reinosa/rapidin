import React, {useEffect} from 'react';
import Navigation from "./App/navigations/Navigation";
import {firebaseApp} from "./App/utills/firebase";
import * as firebase from "firebase";
import { decode, encode} from "base-64";
import {YellowBox} from "react-native";

if(!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;
YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
//   useEffect(() =>{ para saber si está bien el firebase
//     firebase.auth().onAuthStateChanged((user) =>{
//       console.log(user);
//     });
//
// }, [] );
  return (
    <Navigation/>
  );
}
