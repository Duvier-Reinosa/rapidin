import React, {useRef, useState, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect, useIsFocused} from "@react-navigation/native";


import Loading from "../components/Loading";
import Product from "../components/Product";


import { firebaseApp } from "../utills/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

let refGeneral

export default function Products(props) {
  const {navigation, createBy} = props;

  const [products, setProducts] = useState([]);
  const [ isLoading, setIsLoading] = useState(false);

  

  let uid

  if (createBy != null) {
        uid = createBy;
  }

  let ref = "products" + uid; //para referencias sin errores
  refGeneral = ref;

  useFocusEffect(
     useCallback(()=>{
        setIsLoading(true)
        const resultProducts = [];
        const resultIds = []
        db.collection(ref).get().then((snap)=>{
        snap.forEach((doc)=>{
        resultIds.push(doc.id);
        resultProducts.push(doc.data())
        })
        setProducts(resultProducts);
        setIsLoading(false);
     });

     }, [])
  );



    return (
      <View style={styles.productsScreen}>
          <Text style={styles.title}>Productos</Text>
            {
            (products.length > 0) ? 
            <ScrollView>
              <FlatList
                    data={products}
                    renderItem={(product) => <Product 
                                                product={product}/>}
                    keyExtractor={(item, index) => index.toString}
              />  
            </ScrollView>
            : 
            <View style={styles.productsContainer} >
               <Text>Este negocio no tiene productos por el momento</Text>
              </View>}
            <Loading isVisible={isLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
  productsScreen:{
    flex: 1
 },
 title:{
    margin: 20,
    fontWeight: "bold"
 },
 productsContainer:{
  alignItems: "center",
  width: "100%"
},
 addProductsImage:{
   marginTop: "20%",
   height: 400,
   width: 400
 }
  });