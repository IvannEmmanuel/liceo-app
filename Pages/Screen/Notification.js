import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import loadFonts from "../../Style/load"; // Assuming you have this utility to load fonts
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Notification = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Event data
    const events = [
        {
            title: "THANKSGIVING MASS",
            time: "8 - 10 AM",
            location: "LDCU MAIN CAMPUS",
        },
        {
            title: "MUSIK ADELANTE",
            time: "8 - 10 AM",
            location: "LDCU MAIN CAMPUS",
        },
        {
            title: "LICEO HELP BLOOD LETTING",
            time: "8 - 10 AM",
            location: "PASEO DEL RIO",
        },
        {
            title: "LICEO U GAMES",
            time: "8 - 10 AM",
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
            source={require("../../Images/Calendar Background.jpg")} // Replace with your image path
            style={styles.container}
            resizeMode="cover"
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.time}>07:00</Text>
                <View style={styles.statusIcons}>
                    <Icon name="cellphone-wireless" size={20} color="#FFF" />
                    <Icon name="wifi" size={20} color="#FFF" />
                    <Icon name="battery" size={20} color="#FFF" />
                </View>
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    NOTIFICATIONS <Text style={styles.highlight}>ALERTS</Text>
                </Text>
            </View>

            {/* Event List */}
            <ScrollView contentContainerStyle={styles.eventList}>
                {events.map((event, index) => (
                    <NotificationCard
                        key={index}
                        title={event.title}
                        time={event.time}
                        location={event.location}
                    />
                ))}
            </ScrollView>
        </ImageBackground>
    );
};

const NotificationCard = ({ title, time, location }) => {
    const [isMuted, setIsMuted] = useState(false); // State to track mute status
    const [isDismissed, setIsDismissed] = useState(false); // State to track dismissal

    const toggleMute = () => {
        setIsMuted((prevMuted) => !prevMuted); // Toggle the mute state
    };

    const dismissNotification = () => {
        setIsDismissed(true); // Mark the notification as dismissed
    };

    if (isDismissed) {
        return null; // If dismissed, return null to hide the notification
    }

    return (
        <View style={styles.notificationContainer}>
            <View style={styles.iconContainer}>
                <Icon
                    name={isMuted ? "bell-off" : "bell-ring"} // Change icon based on mute state
                    size={40}
                    color={isMuted ? "#B0BEC5" : "#FF9800"} // Muted icon is gray, unmuted is orange
                    onPress={toggleMute} // Toggle mute on press
                />
            </View>
            <View style={styles.notificationDetails}>
                <Text style={styles.eventTitle}>{title}</Text>
                <Text style={styles.eventInfo}>{time}</Text>
                <Text style={styles.eventInfo}>{location}</Text>
                <TouchableOpacity
                    style={styles.dismissButton}
                    onPress={dismissNotification}
                >
                    <Text style={styles.dismissText}>Dismiss</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "rgba(38, 50, 56, 0.8)", // Semi-transparent background
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    time: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Roboto", // Replace with your font name if needed
    },
    statusIcons: {
        flexDirection: "row",
        gap: 8,
    },
    titleContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#8D2424",
        fontFamily: "Roboto", // Replace with your font name if needed
    },
    highlight: {
        color: "#FF5722",
    },
    eventList: {
        padding: 16,
    },
    notificationContainer: {
        flexDirection: "row",
        marginBottom: 16, // Space between notifications
        padding: 12,
        backgroundColor: "#FFF",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    iconContainer: {
        backgroundColor: "#1f2a50",
        padding: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    notificationDetails: {
        flex: 1,
        position: "relative", // Added relative positioning
    },
    eventTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#8D2424",
        fontFamily: "Roboto", // Replace with your font name if needed
    },
    eventInfo: {
        color: "#757575",
        fontSize: 14,
        fontFamily: "Roboto", // Replace with your font name if needed
    },
    dismissButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
    dismissText: {
        color: "#8D2424", // Text color
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default Notification;
