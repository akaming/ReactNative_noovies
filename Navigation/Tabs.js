import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies/MoviesContainer";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator();

export default ({ navigation, route }) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Movie";
    navigation.setOptions({
      title: routeName,
    });
  }, [route]);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          if (route.name === "Movies") {
            iconName += "film";
          } else if (route.name === "TV") {
            iconName += "tv";
          } else if (route.name === "Search") {
            iconName += "search";
          } else if (route.name === "Discovery") {
            iconName += "heart";
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? "white" : "grey"}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "black",
          borderTopColor: "black",
        },
      }}
    >
      <Tabs.Screen name="Discovery" component={Favs} />
      <Tabs.Screen name="Movies" component={Movies} />
      <Tabs.Screen name="TV" component={Tv} />
      <Tabs.Screen name="Search" component={Search} />
    </Tabs.Navigator>
  );
};
