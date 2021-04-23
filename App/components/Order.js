import React, {useRef, useState, useCallback} from "react";
import {StyleSheet, View, Text, Linking} from "react-native";
import { Input, Button } from "react-native-elements";
import Toast from 'react-native-easy-toast-types';
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

import { firebaseApp } from "../utills/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

export default function Order(props) {
    const {createBy, navigation}= props;
    const toastRef = useRef();

    const [orderName, setOrderName] = useState("");
    const [direction, setDirection] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");

    const [products, setProducts] = useState([]);
  
    
  

  
    let ref = "products" + createBy; //para referencias sin errores
  
    useFocusEffect(
       useCallback(()=>{
          const resultProducts = [];
          const resultIds = []
          db.collection(ref).get().then((snap)=>{
          snap.forEach((doc)=>{
          resultIds.push(doc.id);
          resultProducts.push(doc.data())
          })
          setProducts(resultProducts);
       });
  
       }, [])
    );

    const order = {
        orderName : orderName,
        direction: direction,
        phone: phone,
        note: note
    }

  const sendOrder = () => {
   if(orderName == "" || direction == "" || phone == ""){
    toastRef.current.show("Debes tener todos los campos de tu pedido llenos.");
   }else{
    console.log(order);
    db.collection(`Orders${createBy}`).add(order)
    .then((docRef) => {
        toastRef.current.show("Tu pedido ha sido envíado, en breve un repartidor lo llevará a tu casa.", 5000);
        setTimeout(() => {navigation.goBack()}, 6000);
    })
    .catch((error) => {
        toastRef.current.show("No se realizó tu pedido.", 5000)
    });
   }

  };

  return (
    <View >
      {
      (products.length > 0) ? 
        <View style={styles.container}>
          <Text style={styles.title}>¡Pide lo que quieras!</Text>
          <Input
            placeholder="¿Que quieres pedir?"
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChange={(e) => setOrderName(e.nativeEvent.text)}
          />
          <Input
            placeholder="Tu número de celular"
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChange={(e) => setPhone(e.nativeEvent.text)}
          />
          <Input
            placeholder="Dirección de entrega"
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChange={(e) => setDirection(e.nativeEvent.text)}
          />
          <Input
            placeholder="Anotaciones"
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChange={(e) => setNote(e.nativeEvent.text)}
          />
          <Button
            title="Enviar Pedido"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={sendOrder}
          />
        <Toast ref={toastRef} position="center"/>
      </View> : <View></View>
    }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  title:{
    fontWeight: "bold",
    color: "#ff003c",
  },
  textArea: {
    height: 80,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
  },
  btn: {
    backgroundColor: "#ff003c",
  },
});
