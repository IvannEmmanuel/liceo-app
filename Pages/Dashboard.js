import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
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
                        const iconSize = focused ? size * 1.3 : 30;

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
                        const fontSize =
                            route.name === "Notification" ? 9.4 : 12;
                        return focused ? (
                            <Text style={[styles.tabBarLabel, { fontSize }]}>
                                {route.name.toUpperCase()}
                            </Text>
                        ) : null;
                    },
                    tabBarStyle: {
                        height: 60,
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
        marginTop: 20,
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
    tabBarLabel: {
        color: "#f9b210",
        fontFamily: "Poppins-Bold",
        top: 5,
        textAlign: "center",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "flex-start", // Aligns the modal view to the top
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        paddingTop: 50, // Adds padding from the top
    },
});
