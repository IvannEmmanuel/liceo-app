import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Modal, StyleSheet } from "react-native";
import StartingPage from "./Pages/StartingPage";
import Login from "./Pages/components/Login";
import Dashboard from "./Pages/Dashboard";
import NotificationContext from "./Pages/components/NotificationContext"; // Adjust path as necessary

// Event data for notifications
const events = [
    {
        id: 1,
        title: "ANNOUNCEMENT ON FEBRUARY 24",
        message: "70TH FOUNDING ANNIVERSARY CELEBRATION!",
        image: require("./Images/liceo-maroon.png"),
    },
    {
        id: 2,
        title: "EVENT ON MARCH 10",
        message: "SPRING FESTIVAL!",
        image: require("./Images/liceo-maroon.png"),
    },
    {
        id: 3,
        title: "WORKSHOP ON APRIL 15",
        message: "DIGITAL MARKETING STRATEGIES",
        image: require("./Images/liceo-maroon.png"),
    },
    {
        id: 4,
        title: "SEMINAR ON MAY 5",
        message: "LEADERSHIP IN THE MODERN WORLD",
        image: require("./Images/liceo-maroon.png"),
    },
    {
        id: 5,
        title: "CONCERT ON JUNE 25",
        message: "SUMMER MUSIC FESTIVAL",
        image: require("./Images/liceo-maroon.png"),
    },
    {
        id: 6,
        title: "CULTURAL FESTIVAL ON JULY 20",
        message: "HERITAGE AND TRADITIONS",
        image: require("./Images/liceo-maroon.png"),
    },
    {
        id: 7,
        title: "CONFERENCE ON AUGUST 30",
        message: "TECHNOLOGY AND INNOVATION",
        image: require("./Images/liceo-maroon.png"),
    },
    {
        id: 8,
        title: "CHARITY RUN ON SEPTEMBER 10",
        message: "RUN FOR A CAUSE",
        image: require("./Images/liceo-maroon.png"),
    },
    {
        id: 9,
        title: "ART EXHIBITION ON OCTOBER 15",
        message: "SHOWCASE OF LOCAL ARTISTS",
        image: require("./Images/liceo-maroon.png"),
    },
    {
        id: 10,
        title: "FOOD FESTIVAL ON NOVEMBER 5",
        message: "CULINARY DELIGHTS FROM AROUND THE WORLD",
        image: require("./Images/liceo-maroon.png"),
    },
];

const Stack = createNativeStackNavigator();

const App = () => {
    const [currentNotification, setCurrentNotification] = useState(null);

    // Set random event notifications every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * events.length);
            setCurrentNotification(events[randomIndex]);
        }, 100000); // need kulangan 1 ka 0, gituyo na para dili sagabal

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    const closeNotification = () => {
        setCurrentNotification(null); // Close notification manually
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="StartingPage" component={StartingPage} />
            </Stack.Navigator>

            {/* Modal for persistent notification */}
            {currentNotification && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={currentNotification !== null}
                    onRequestClose={closeNotification}
                >
                    <View style={styles.modalBackground}>
                        <NotificationContext
                            notification={currentNotification}
                            onClose={closeNotification}
                        />
                    </View>
                </Modal>
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "flex-start", // Aligns the modal view to the top
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        paddingTop: 50, // Adds padding from the top
    },
});

export default App;
