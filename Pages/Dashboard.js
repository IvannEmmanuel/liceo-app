import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Home from "./Screen/Home";
import Map from "./Screen/Map";
import Notification from "./Screen/Notification";
import Profile from "./Screen/Profile";
import Start from "./Screen/Start";

const homeName = "Home";
const mapName = "Map";
const notificationName = "Notification";
const profileName = "Profile";
const startName = "Start";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === mapName) {
            iconName = focused ? "map" : "map-outline";
          } else if (rn === notificationName) {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (rn === profileName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === startName) {
            iconName = focused ? "play-circle" : "play-circle-outline";
          }

          // Adjust the size based on whether the tab is focused
          const iconSize = focused ? size * 1.5 : size;
          
          return (
            <View style={[
              styles.iconContainer,
              focused && styles.focusedIconContainer,
            ]}>
              <Ionicons 
                name={iconName} 
                size={iconSize} 
                color={color} 
              />
            </View>
          );
        },
        tabBarActiveTintColor: "#3498DB",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { 
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={mapName} component={Map} />
      <Tab.Screen name={startName} component={Start} />
      <Tab.Screen name={notificationName} component={Notification} />
      <Tab.Screen name={profileName} component={Profile} />
    </Tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  focusedIconContainer: {
    backgroundColor: '#FF4444',
    borderRadius: 25,
    marginTop: -20,
    width: 50,
    height: 50,
  },
});