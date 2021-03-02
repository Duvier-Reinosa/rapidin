import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurants from "../screens/Restaurants/Restaurants";
import AddRestaurant from "../screens/Restaurants/AddRestaurant";
import Restaurant from "../screens/Restaurants/Restaurant";
import AddReviewsRestaurant from "../screens/Restaurants/AddReviewsRestaurant";


const Stack = createStackNavigator();

export default function RestaurantsStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ title: "Servicios"}}
      />
      <Stack.Screen
        name="add-restaurant"
        component={AddRestaurant}
        options={{ title: "Añadir servicio"}}
      />
      <Stack.Screen
        name="restaurant"
        component={Restaurant}
      />
      <Stack.Screen
        name="add-review-restaurant"
        component={AddReviewsRestaurant}
        options={{ title: "Nuevo comentario"}}
      />
    </Stack.Navigator>
  );
}
