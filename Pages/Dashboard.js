import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Map from "./Screen/Map";
import Calendar from "./Screen/Calendar";
import Notification from "./Screen/Notification";
import Profile from "./Screen/Profile";
import Locate from "./Screen/Locate";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Select icon based on the route name
          switch (route.name) {
            case "Map":
              iconName = focused ? "map" : "map";
              break;
            case "Calendar":
              iconName = focused ? "calendar" : "calendar";
              break;
            case "Notification":
              iconName = focused ? "notifications" : "notifications";
              break;
            case "Profile":
              iconName = focused ? "person" : "person";
              break;
            case "Locate":
              iconName = focused ? "locate" : "locate";
              break;
            default:
              iconName = "map"; // Default icon
          }

          // Set icon color based on focus state
          const iconColor = focused ? "#f9f7f5" : "#f9b210"; // Color changes when selected or not

          // Adjust the size based on focus
          const iconSize = focused ? size * 1.5 : size;

          return (
            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
              <Ionicons name={iconName} size={iconSize} color={iconColor} />
            </View>
          );
        },
        tabBarStyle: { 
          height: 60, 
          paddingBottom: 5, 
          backgroundColor: "#1f2a50",  // Set bottom tab bar color here
        },
      })}
    >
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Locate" component={Locate} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  focusedIconContainer: {
    backgroundColor: "#761d1d",
    borderRadius: 25,
    marginTop: -20,
    width: 50,
    height: 50,
  },
});
