import React, { useState} from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import uuid from "random-uuid-v4";

import { firebaseApp } from "../../utills/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import  "firebase/firestore";
const db = firebase.firestore(firebaseApp );

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation} = props;
  const [ restaurantName, setRestaurantName] =useState("");
  const [ restaurantAddres, setRestaurantAddres] =useState("");
  const [ restaurantDescription, setRestaurantDescription] =useState("");
  const [imageSelected, setImageSelected] = useState([]);
  const addRestaurant = () =>{
    if(!restaurantName || !restaurantAddres || !restaurantDescription){
      toastRef.current.show("Todos los campos del formulario son obligatorios");
    }else if(size(imageSelected) === 0){
      toastRef.current.show("El restaurante tiene que tener almenos una foto");
    }else {
      setIsLoading(true);
      uploadImageStorage().then((response) =>{
      db.collection("restaurants")
      .add({
        name: restaurantName,
        address: restaurantAddres,
        description: restaurantDescription,
        images: response,
        rating: 0,
        ratingTotal: 0,
        quantityVoting: 0,
        createAt: new Date,
        createBy: firebase.auth().currentUser.uid,
      })
        .then(()=>{
            setIsLoading(false);
            navigation.navigate("restaurants");
          }).catch(()=>{
            setIsLoading(false);
            toastRef.current.show("Error al subir el restaurante, intentelo más tarde")
          })
      });
    }
  }

  const uploadImageStorage = async ()=>{
    // console.log(imageSelected);
    const imageBlob = [];

    await Promise.all(
      map(imageSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("restaurants").child(uuid());
        await ref.put(blob).then(async (result)=>{
          await firebaseApp
          .storage()
          .ref(`restaurants/${result.metadata.name}`)
          .getDownloadURL()
          .then((photoUrl) => {
              imageBlob.push(photoUrl);
          });
        });
      })
    );
    return  imageBlob;
  };
  return (
    <ScrollView style={styles.scrollView}>
      <ImageRestaurante imageRestaurant={imageSelected[0]}/>
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAddres={setRestaurantAddres}
        setRestaurantDescription={setRestaurantDescription}
        />
      <UploadImage toastRef={toastRef} imageSelected={imageSelected} setImageSelected={setImageSelected}/>
      <Button
        title="Añadir servicio"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
    </ScrollView>
  );
}

function FormAdd(props) {
  const {setRestaurantName, setRestaurantAddres, setRestaurantDescription} = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del servicio"
        containerStyle={styles.input}
        onChange={e => setRestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        onChange={e => setRestaurantAddres(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripción del servicio(Que vendes, cuanto vale...)"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={e => setRestaurantDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function ImageRestaurante(props) {
  const { imageRestaurant } = props;
  return (
    <View style={styles.viewPhoto}>
      <Image
        source={imageRestaurant
           ? {uri: imageRestaurant}
           : require("../../../assets/img/no-image.png")}
        style={{width: widthScreen, height: 200}}
        />
    </View>
  );

}

function UploadImage(props) {
  const {toastRef, setImageSelected, imageSelected} = props;

  const imageSelect = async() =>{
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermissions === "denied") {
      toastRef.current.show("Es necesario que aceptes los permisos de la galeria, si los has rechazado tienes que ir a ajustes y activarlos manualmente.", 4000);
    }else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect:[4,3]
      });
      if (result.cancelled) {
        toastRef.current.show("Has cerrado la galería sin seleccionar ninguna imagen", 2000);
      }else {
        console.log("ok");
        // setImageSelected(result.uri);
        setImageSelected([...imageSelected, result.uri]);
      }
    }
  };

  const removeImage = (image)=>{
    Alert.alert(
      "Eliminar Imagen",
      "¿Estás seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: ()=>{
            setImageSelected(filter(imageSelected, (imageUrl) => imageUrl !== image))
          }
        }
      ],
      {cancelable: false}
    )
  }

  return (
    <View style ={styles.viewImages}>
      {size(imageSelected)< 5 && (
        <Icon
          type="materal-community"
          name="camera"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )
      }
      {map(imageSelected, (imageRestaurante, index)=>(
        <Avatar
          key={index}
          style={styles.miniaturaStyles}
          source={{uri: imageRestaurante}}
          onPress={()=> removeImage(imageRestaurante)}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView:{
    height: "100%",
  },
  viewForm:{
    marginLeft: 10,
    marginRight: 10,
  },
  input:{
    marginBottom: 10
  },
  textArea:{
    height: 100,
    width: "100%",
    padding: 0
  },
  btnAddRestaurant:{
    backgroundColor: "#ff003c",
    margin: 20
  },
  viewImages:{
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon:{
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniaturaStyles:{
    width: 70,
    height: 70,
    marginRight: 10
  },
  viewPhoto:{
  alignItems: "center",
  height: 200,
  marginBottom: 20,
  }
})
