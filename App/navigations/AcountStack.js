import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Acount from "../screens/Acount/Acount";
import Login from "../screens/Acount/Login";
import Register from "../screens/Acount/Register";

const Stack = createStackNavigator();

export default function AcountStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name = "acount"
        component = {Acount}
        options = { {title : "Cuenta"}}
          />
      <Stack.Screen
        name = "login"
        component = {Login}
        options = { {title : "Iniciar sesión"}}
      />
      <Stack.Screen
        name = "register"
        component = {Register}
        options = { {title : "Regístrate"}}
      />
    </Stack.Navigator>
  );
}
