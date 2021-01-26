import React, { useState} from "react";
import {StyleSheet, View, Text, Linking} from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function Whatsapp(props) {
  const {name} = props;
  const nombreRestaurante = " Restaurante: " + name;
  const [mobileNumber, setMobileNumber] = useState("3127973896");
  const [whatsAppMsg, setWhatsAppMsg] = useState("");

  const initiateWhatsApp = () => {
    if (mobileNumber.length != 10) {
      alert('Please insert correct WhatsApp number');
      return;
    }
    setWhatsAppMsg(whatsAppMsg + nombreRestaurante);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Pide lo que quieras!</Text>
      <Input
        placeholder="Pedido..."
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setWhatsAppMsg(e.nativeEvent.text)}
      />
      <Button
        title="Enviar Pedido"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={initiateWhatsApp}
      />
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
