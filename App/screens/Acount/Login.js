import React, {useRef} from "react";
import {StyleSheet, ScrollView, Image ,View, Text} from "react-native";
import {Divider} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast-types";
import LoginForm from "../../components/Acount/LoginForm";

export default function Login() {
  const toastRef = useRef();
  return(
    <ScrollView>
      <Image
        source={require("../../../assets/img/portada.png")}
        resizeMode="contain"
        style={styles.logo}/>
      <View style={styles.container}>
        <LoginForm toastRef={toastRef}/>
        <CreateAccount/>
      </View>
      <Divider style={styles.divider}/>
      <Toast ref={toastRef} position="center"/>
    </ScrollView>
  );

}

function CreateAccount() {
  const navigation = useNavigation();
  return(
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta? {" "}
      <Text style={styles.btnRegister}
      onPress={() => navigation.navigate("register")}>
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo:{
    width: "100%",
    height: 220,
    marginTop: 20,
  },
  container:{
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,

  },

  btnRegister: {
    color: "#ff003c",
    fontWeight: "bold",
  },
  divider:{
    backgroundColor: "#ff003c",
    margin: 40,
  },
});
