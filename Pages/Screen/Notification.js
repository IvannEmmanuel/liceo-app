import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import loadFonts from "../../Style/load";

const Notification = () => {
    const { width, height } = useWindowDimensions(); // Get device dimensions
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
            source={require("../../Images/CalendarBackground.jpg")}
            style={[styles.container, { width, height }]}
            resizeMode="cover"
        >
            {/* Title */}
            <View
                style={[
                    styles.titleContainer,
                    { marginVertical: height * 0.05 },
                ]}
            >
                <Image
                    source={require("../../Images/megaphone-black.png")}
                    style={[
                        styles.megaphoneIcon,
                        { width: width * 0.2, height: height * 0.09 },
                    ]}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.title, { fontSize: width * 0.08 }]}>
                        NOTIFICATIONS
                    </Text>
                    <Text style={[styles.title, { fontSize: width * 0.08 }]}>
                        CENTER
                    </Text>
                </View>
            </View>

            {/* Event List */}
            <ScrollView contentContainerStyle={styles.eventList}>
                {events.map((event) => (
                    <NotificationCard
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        width={width}
                        height={height}
                    />
                ))}
            </ScrollView>
        </ImageBackground>
    );
};

const NotificationCard = ({ id, title, width, height }) => {
    const navigation = useNavigation(); // Hook for navigation

    const handlePress = () => {
        if (id === 1) {
            navigation.navigate("Founding"); // Navigate to Founding screen
        } else if (id === 2) {
            navigation.navigate("LiceoGames"); // Navigate to LiceoGames screen
        }
    };

    return (
        <View
            style={[
                styles.notificationWrapper,
                { marginBottom: height * 0.05 },
            ]}
        >
            <View
                style={[
                    styles.notificationContainer,
                    { padding: width * 0.03, paddingTop: height * 0.015 },
                ]}
            >
                {/* Icon */}
                <View style={styles.iconContainer}>
                    <Image
                        source={require("../../Images/liceo-maroon.png")}
                        style={[
                            styles.liceoIcon,
                            { width: width * 0.2, height: height * 0.1 },
                        ]}
                    />
                </View>
                <View style={styles.notificationDetails}>
                    <Text
                        style={[styles.eventTitle, { fontSize: width * 0.06 }]}
                    >
                        {title}
                    </Text>
                </View>
            </View>

            {/* Button to view event details */}
            <TouchableOpacity
                style={[
                    styles.touchableBar,
                    {
                        width: width * 0.8,
                        padding: width * 0.03,
                        marginTop: -height * 0.016,
                    },
                ]}
                onPress={handlePress}
            >
                <Text
                    style={[styles.touchableText, { fontSize: width * 0.05 }]}
                >
                    VIEW EVENT DETAILS
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    megaphoneIcon: { marginRight: 10, marginTop: 15 },
    liceoIcon: { justifyContent: "center", alignItems: "center" },
    textContainer: { flexDirection: "column", marginTop: 25 },
    title: {
        fontWeight: "bold",
        color: "#8D2424",
        fontFamily: "Source-Sans-Pro-Bold",
        textAlign: "center",
    },
    eventList: { padding: 16 },
    notificationWrapper: { marginBottom: 40 },
    notificationContainer: {
        flexDirection: "row",
        backgroundColor: "#1f2a50",
        borderRadius: 15,
        alignItems: "center",
        position: "relative",
    },
    iconContainer: {
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
        color: "#fff",
        fontFamily: "Source-Sans-Pro-Bold",
        textAlign: "center",
    },
    touchableBar: {
        backgroundColor: "#737373",
        borderRadius: 15,
        alignItems: "center",
        alignSelf: "center",
        zIndex: -1, // Ensures the bar is below the notification container
    },
    touchableText: {
        color: "#FFFFFF",
        fontFamily: "Poppins-Bold",
    },
});

export default Notification;
