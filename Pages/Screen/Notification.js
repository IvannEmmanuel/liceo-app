import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import loadFonts from "../../Style/load";

const Notification = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Event data
    const events = [
        {
            id: 1,
            title: "ANNOUNCEMENT! 70th FOUNDING ANNIVERSARY",
            time: "8 - 10 AM",
            location: "LDCU MAIN CAMPUS",
        },
        {
            id: 2,
            title: "LICEO GAMES 2024",
            time: "7 - 10 AM",
            location: "LDCU MAIN CAMPUS",
        },
    ];

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

    if (!fontsLoaded) {
        return null; // Return nothing while fonts are loading
    }

    return (
        <ImageBackground
            source={require("../../Images/Calendar Background.jpg")}
            style={styles.container}
            resizeMode="cover"
        >
            {/* Title */}
            <View style={styles.titleContainer}>
                <Image
                    source={require("../../Images/megaphone-black.png")}
                    style={styles.megaphoneIcon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>NOTIFICATIONS</Text>
                    <Text style={styles.title}>CENTER</Text>
                </View>
            </View>

            {/* Event List */}
            <ScrollView contentContainerStyle={styles.eventList}>
                {events.map((event) => (
                    <NotificationCard
                        key={event.id}
                        id={event.id}
                        title={event.title}
                    />
                ))}
            </ScrollView>
        </ImageBackground>
    );
};

const NotificationCard = ({ id, title }) => {
    const navigation = useNavigation(); // Hook for navigation

    const handlePress = () => {
        if (id === 1) {
            navigation.navigate("Founding"); // Navigate to Founding screen
        } else if (id === 2) {
            navigation.navigate("LiceoGames"); // Navigate to LiceoGames screen
        }
    };

    return (
        <View style={styles.notificationWrapper}>
            <View style={styles.notificationContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require("../../Images/liceo-maroon.png")}
                        style={styles.liceoIcon}
                    />
                </View>
                <View style={styles.notificationDetails}>
                    <Text style={styles.eventTitle}>{title}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.touchableBar} onPress={handlePress}>
                <Text style={styles.touchableText}>VIEW EVENT DETAILS</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    // Style definitions remain unchanged
    container: { flex: 1 },
    titleContainer: {
        marginVertical: 50,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    megaphoneIcon: { width: 90, height: 90, marginRight: 10 },
    liceoIcon: { width: 90, height: 90 },
    textContainer: { flexDirection: "column" },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#8D2424",
        fontFamily: "Source-Sans-Pro-Bold",
        textAlign: "center",
    },
    eventList: { padding: 16 },
    notificationWrapper: { marginBottom: 40 },
    notificationContainer: {
        flexDirection: "row",
        padding: 12,
        paddingTop: 5,
        backgroundColor: "#1f2a50",
        borderRadius: 15,
        elevation: 4,
        alignItems: "center",
    },
    iconContainer: {
        padding: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    notificationDetails: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    eventTitle: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#fff",
        fontFamily: "Source-Sans-Pro-Bold",
        textAlign: "center",
    },
    touchableBar: {
        width: "80%",
        backgroundColor: "#737373",
        padding: 10,
        borderRadius: 15,
        alignItems: "center",
        alignSelf: "center",
        marginTop: -10,
        zIndex: -1, // Ensures the bar is below the notification container
    },
    touchableText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: "Poppins-Bold",
    },
});

export default Notification;
