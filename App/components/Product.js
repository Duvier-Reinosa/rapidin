import React from 'react';
import {StyleSheet, View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { firebaseApp } from "../utills/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

export default function Product(props) {
    const {product} = props;
    const theProduct = product.item.product;

    return(
       <View style={styles.productsContainer} >
          <View style={styles.productContainer}>

             <Text style={styles.productName}> 
                {theProduct.nombre}
                </Text>
             <Text style={styles.productDates}>{theProduct.descripcion}</Text>
             <Text style={styles.productDates}>Precio: {theProduct.precio}</Text>
          </View>
       </View>
       
    )
}

const styles = StyleSheet.create({
   productsContainer:{
       alignItems: "center",
       width: "100%"
    },
   productContainer:{
       borderRadius: 10,
       marginTop: 20,
       width: "90%",
       height: 120,
       backgroundColor: "#D1D1D1",
       shadowColor: "#A0A0A0",
       
    },
    productName:{
       fontWeight: "bold",
       marginTop: 10,
       marginLeft: 15
    },
    productDates:{
       marginTop: 2,
       marginLeft: 15,
       color: "#7E7E7E" 
    },
    btnDeleteContainer: {
       padding: 5,
    },
    btnDelete:{
       backgroundColor:"transparent",
    }
 });
