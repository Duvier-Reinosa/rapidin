import React, {useRef, useEffect, useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import {Input, Icon, Button} from "react-native-elements";
import Toast from "react-native-easy-toast-types";
import * as firebase from "firebase";
import InfoUser from "../../components/Acount/InfoUser";
import AccountOptions from "../../components/Acount/AccountOptions";

export default function UserLogged(){
  const [userInfo, setUserInfo] =useState(null);
  const [reloadUserInfo, setReloadUserInfo] =useState(false);
  const toastRef = useRef();
  console.log(reloadUserInfo);

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setReloadUserInfo(false);
  }, [reloadUserInfo]);

  return(
    <View style={styles.viewUserInfo}>
      {userInfo &&
        <InfoUser
              toastRef={toastRef}
              userInfo={userInfo}
                      />}
      <AccountOptions
        userInfo={userInfo}
        toastRef={toastRef}
        setReloadUserInfo={setReloadUserInfo}/>
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSission}
        onPress={() => firebase.auth().signOut()}
        titleStyle={styles.BtnCloseSessionText}
        />
        <Toast ref={toastRef} position="center" opacity={0, 9}/>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo:{
    minHeight: "100%",
    backgroundColor : "#f2f2f2",
  },
  btnCloseSission:{
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10
  },
  BtnCloseSessionText:{
    color: "#ff003c"
  }
});
