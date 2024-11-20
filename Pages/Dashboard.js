import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import loadFonts from "../Style/load";

// Screens
import Map from "./Screen/Map";
import Calendar from "./Screen/Calendar";
import Notification from "./Screen/Notification";
import Profile from "./Screen/Profile";
import Locate from "./Screen/Locate";
import NotificationContext from "./components/NotificationContext"; // Adjust path as necessary

const Tab = createBottomTabNavigator();

// Get screen width and height for responsiveness
const { width, height } = Dimensions.get("window");

const Dashboard = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const events = [
        {
            id: 1,
            title: "ANNOUNCEMENT ON FEBRUARY 24",
            message: "70TH FOUNDING ANNIVERSARY CELEBRATION!",
            image: require("../Images/liceo-maroon.png"),
        },
    ];

    // Load custom fonts
    useEffect(() => {
        const load = async () => {
            try {
                await loadFonts();
                setFontsLoaded(true);
            } catch (error) {
                console.error("Error loading fonts:", error);
            }
        };

        load();
    }, []);

    // Show notification once with delay
    useEffect(() => {
        if (fontsLoaded) {
            const timer = setTimeout(() => {
                setShowNotification(true);
            }, 3000); // 1 second delay after loading fonts

            // Clear the timeout when component unmounts
            return () => clearTimeout(timer);
        }
    }, [fontsLoaded]);

    // Close the notification modal
    const closeNotification = () => {
        setShowNotification(false);
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            <Tab.Navigator
                initialRouteName="Map"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        // Select icon based on the route name
                        switch (route.name) {
                            case "Map":
                                iconName = "map";
                                break;
                            case "Calendar":
                                iconName = "calendar";
                                break;
                            case "Notification":
                                iconName = "notifications";
                                break;
                            case "Profile":
                                iconName = "person";
                                break;
                            case "Locate":
                                iconName = "locate";
                                break;
                            default:
                                iconName = "map"; // Default icon
                        }

                        // Set icon color based on focus state
                        const iconColor = focused ? "#F2F2F2" : "#f9b210";

                        // Adjust the size based on focus
                        const iconSize = focused ? size * 1.3 : width * 0.07; // Adjust size with a fraction of the screen width

                        return (
                            <View
                                style={[
                                    styles.iconContainer,
                                    focused && styles.focusedIconContainer,
                                ]}
                            >
                                <Ionicons
                                    name={iconName}
                                    size={iconSize}
                                    color={iconColor}
                                />
                            </View>
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        // Use responsive font size for the label
                        const fontSize = width * 0.02; // 2% of screen width for font size
                        return focused ? (
                            <Text style={[styles.tabBarLabel, { fontSize }]}>
                                {route.name.toUpperCase()}
                            </Text>
                        ) : null;
                    },
                    tabBarStyle: {
                        height: height * 0.08, // 8% of screen height for the tab bar height
                        paddingBottom: 5,
                        backgroundColor: "#1f2a50", // Set bottom tab bar color here
                    },
                })}
            >
                <Tab.Screen name="Map" component={Map} />
                <Tab.Screen name="Calendar" component={Calendar} />
                <Tab.Screen name="Locate" component={Locate} />
                <Tab.Screen name="Notification" component={Notification} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>

            {/* Modal for persistent notification */}
            {showNotification && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={showNotification}
                    onRequestClose={closeNotification}
                >
                    <View style={styles.modalBackground}>
                        <NotificationContext
                            notification={events[0]} // Displaying the first event notification
                            onClose={closeNotification}
                        />
                    </View>
                </Modal>
            )}
        </>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.02, // Adjust icon container top margin based on screen height
        width: width * 0.12, // Adjust width of icon container based on screen width
        height: width * 0.12, // Adjust height of icon container based on screen width
    },
    focusedIconContainer: {
        backgroundColor: "#761d1d",
        borderRadius: width * 0.06, // Half of the icon container width for rounded effect
        marginTop: -height * 0.015, // Adjust vertical margin for focus effect based on screen height
        width: width * 0.12,
        height: width * 0.12,
    },
    tabBarLabel: {
        color: "#f9b210",
        fontFamily: "Poppins-Bold",
        top: height * 0.01, // Adjust vertical positioning based on screen height
        textAlign: "center",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "flex-start", // Aligns the modal view to the top
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        paddingTop: height * 0.1, // Padding top adjusted based on screen height
    },
});
