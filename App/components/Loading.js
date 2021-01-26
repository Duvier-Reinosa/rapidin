import React from "react";
import {StyleSheet, View, Text, ActivityIndicator} from "react-native";
import {Overlay} from "react-native-elements";

export default function Loading(props){
  const { isVisible, text} = props;
  return (
    <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0, 0, 0, 0.5)"
            overlayBackgroundColor="transparent"
            style={styles.overlay}
            >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="white"/>
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}
const styles = StyleSheet.create({
  overlay: {
    height: 200,
    width: 300 ,
    backgroundColor: "#fff",
    borderColor: "#ff003c",
    borderWidth: 0,
    borderRadius:10,
  },
  view:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    color: "white",
    textTransform: "uppercase",
    marginTop: 10,
  }
});
