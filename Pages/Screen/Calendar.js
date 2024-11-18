import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
} from "react-native";
import loadFonts from "../../Style/load"; // Assuming you have this utility to load fonts
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Calendar = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Event data
    const events = [
        {
            date: "OCT 13",
            title: "THANKSGIVING MASS",
            time: "8 - 10 AM",
            location: "LDCU MAIN CAMPUS",
        },
        {
            date: "OCT 15",
            title: "MUSIK ADELANTE",
            time: "8 - 10 AM",
            location: "LDCU MAIN CAMPUS",
        },
        {
            date: "OCT 30",
            title: "LICEO HELP BLOOD LETTING",
            time: "8 - 10 AM",
            location: "PASEO DEL RIO",
        },
        {
            date: "NOV 10-13",
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
                    CALENDAR <Text style={styles.highlight}>OF EVENTS</Text>
                </Text>
            </View>

            {/* Event List */}
            <ScrollView contentContainerStyle={styles.eventList}>
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        date={event.date}
                        title={event.title}
                        time={event.time}
                        location={event.location}
                    />
                ))}
            </ScrollView>
        </ImageBackground>
    );
};

const EventCard = ({ date, title, time, location }) => {
    const [month, dayRange] = date.split(" "); // Split month and day range

    return (
        <View style={styles.eventContainer}>
            <View style={styles.dateContainer}>
                <Text style={styles.monthText}>{month}</Text>
                <Text style={styles.dayText}>{dayRange}</Text>
            </View>
            <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{title}</Text>
                <Text style={styles.eventInfo}>{time}</Text>
                <Text style={styles.eventInfo}>{location}</Text>
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
    eventContainer: {
        flexDirection: "row",
        marginBottom: 16, // Space between events
    },
    dateContainer: {
        backgroundColor: "#1f2a50",
        borderRadius: 8,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
        borderRadius: 15,
    },
    monthText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: "Roboto", // Replace with your font name if needed
    },
    dayText: {
        color: "#FFF",
        fontSize: 14,
        fontFamily: "Roboto", // Replace with your font name if needed
    },
    eventDetails: {
        flex: 1,
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
});

export default Calendar;
