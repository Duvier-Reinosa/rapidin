import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements";

import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack";
import SearchStack from "./SearchStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import AcountStack from "./AcountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return(
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="acount"
      tabBarOptions={{
        inactiveTintColor: "#646464",
        activeTintColor: "#ff003c",
      }
      }
      screenOptions={({route}) => ({
      tabBarIcon:({color}) => screenOptions(route, color),
      })}
      >
        <Tab.Screen
          name="restaurants"
          component={RestaurantsStack}
          options={{
            title: "Servicios"
          }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{
            title: "Favoritos"
          }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{
            title: "Buscador"
          }}
        />
        <Tab.Screen
          name="topRestaurants"
          component={TopRestaurantsStack}
          options={{
            title: "Top"
          }}
        />
        <Tab.Screen
          name="acount"
          component={AcountStack}
          options={{
            title: "Mi cuenta"
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "restaurants":
      iconName = "compass-outline"
      break;
    case "favorites":
      iconName = "heart-outline"
       break;
     case "topRestaurants":
       iconName = "star-outline"
       break;
     case "search":
       iconName = "magnify"
       break;
     case "acount":
       iconName = "home-outline"
       break;

    default:

  }

  return(
    <Icon type="material-community" name={iconName} size={22} color={color}/>
  )
}
