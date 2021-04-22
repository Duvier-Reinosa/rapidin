import React, { useState, useEffect, useCallback} from "react";
import { StyleSheet, View, Text, Linking} from "react-native";
import { Icon, Button } from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
import { firebaseApp } from "../../utills/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

const db = firebase.firestore(firebaseApp);

export default function Restaurants(props){
 const [user, setUser] = useState(null);
 const { navigation } = props;
 const [restaurants, setRestaurants] = useState([]);
 const [totalRestaurants, setTotalRestaurants] = useState(0);
 const [starRestaurants, setStartRestaurants] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const limitRestaurants = 10;

 const [mobileNumber, setMobileNumber] = useState("3127973896");
  const [whatsAppMsg, setWhatsAppMsg] = useState(".");


 const initiateWhatsApp = () => {
  if (mobileNumber.length != 10) {
    alert('Please insert correct WhatsApp number');
    return;
  }
  setWhatsAppMsg(whatsAppMsg);
  // console.log(whatsAppMsg);
  let url =
    'whatsapp://send?text=' +
     whatsAppMsg +
    '&phone=57' + mobileNumber;

    if (whatsAppMsg != "") {
      Linking.openURL(url)
        .then((data) => {
          console.log('WhatsApp Opened');
        })
        .catch(() => {
          alert('Tienes que tener instalado whatsapp en tu celular');
        });
    }else {
      alert('No puedes envíar un pedido vacío');
    }

};

 useEffect(() => {
   firebase.auth().onAuthStateChanged((userInfo) =>{
     setUser(userInfo);
   })
 }, []);

 useFocusEffect(
   useCallback(()=>{
     db.collection("restaurants").get().then((snap) =>{
       setTotalRestaurants(snap.size);
     });
     const resultRestaurants = [];
     db.collection("restaurants")
     .orderBy("createAt", "desc")
     .limit(limitRestaurants).get().then((response) =>{
       setStartRestaurants(response.docs[response.docs.length -1]);
       response.forEach((doc)=>{
         // console.log(doc.data());
         const restaurant = doc.data();
         restaurant.id = doc.id;
         resultRestaurants.push(restaurant);
       });
       setRestaurants(resultRestaurants)
     });
   }, [])
  )
  
 const handleLoadMore = ()=>{
   const resultRestaurants =[];
   restaurants.length < totalRestaurants && setIsLoading(true);

   db.collection("restaurants")
   .orderBy("createAt", "desc")
   .startAfter(starRestaurants.data().createAt)
   .limit(limitRestaurants).
   get()
   .then(response =>{
     if(response.docs.length > 0){
       setStartRestaurants(response.docs[response.docs.length - 1])
     }else{
       setIsLoading(false);
     }
     response.forEach((doc)=>{
       const restaurant = doc.data();
       restaurant.id = doc.id;
       resultRestaurants.push(restaurant);
     });
     setRestaurants([...restaurants, ...resultRestaurants]);
   });
 }
  return(
    <View style={styles.viewBody}>
      <ListRestaurants restaurants = {restaurants} handleLoadMore={handleLoadMore} isLoading={isLoading}/>
        <Button
          title="Servicio personalizado"
          buttonStyle={styles.PerContainer}
          onPress={initiateWhatsApp}
          icon={
            <Icon
              name="chat"
              size={15}
              color="white"
              iconStyle={styles.icon}
            />
          }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody:{
    flex : 1,
    backgroundColor: "#fff",
  },
  btnContainer:{
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.5,
  },
  PerContainer:{
    position: "absolute",
    bottom: 18,
    left: 13,
    borderRadius: 15,
    height: 45,
    backgroundColor: "#ff003c",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.5,
  },
  icon:{
    marginRight: 5,
    marginTop: 5
  }
});
