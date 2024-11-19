import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
} from "react-native";
import loadFonts from "../../Style/load";

const Calendar = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

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
        return null; // Render nothing while fonts are loading
    }

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
            time: "12 - 3 PM",
            location: "LDCU MAIN CAMPUS",
        },
        {
            date: "OCT 30",
            title: "LICEO HELP BLOOD LETTING",
            time: "3 - 5 PM",
            location: "PASEO DEL RIO",
        },
        {
            date: "NOV 10-13",
            title: "LICEO U GAMES",
            time: "7 - 10 AM",
            location: "LDCU MAIN CAMPUS",
        },
    ];

    return (
        <ImageBackground
            source={require("../../Images/Calendar Background.jpg")} // Replace with your image path
            style={styles.container}
            resizeMode="cover"
        >
            {/* Header */}
            <View style={styles.header}></View>
            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>CALENDAR</Text>
                <View style={styles.highlightsContainer}>
                    <Text style={styles.highlightSmall}>OF</Text>
                    <Text style={styles.highlight}>EVENTS</Text>
                </View>
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
                <Text style={styles.eventInfo}>
                    {time} - {location}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: { height: 40, backgroundColor: "transparent" },
    titleContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
        alignItems: "center", // Centers the content horizontally
    },
    highlightsContainer: {
        flexDirection: "row", // Arrange items in a row
        justifyContent: "center", // Center items horizontally
        alignItems: "center", // Align items vertically
        marginTop: -10,
    },
    title: {
        fontSize: 45, // Larger font size
        fontWeight: "bold",
        color: "#8D2424",
        fontFamily: "Source-Sans-Pro-Bold", // Replace with your font name if needed
        textAlign: "center", // Center align the text
        textShadowColor: "#000", // Add shadow color
        textShadowOffset: { width: 1, height: 1 }, // Add shadow offset
        textShadowRadius: 2, // Add shadow radius
    },
    highlightSmall: {
        fontSize: 25, // Smaller font size for "OF"
        fontWeight: "bold",
        color: "#8D2424",
        textShadowColor: "#000", // Add shadow color
        textShadowOffset: { width: 1, height: 1 }, // Add shadow offset
        textShadowRadius: 2, // Add shadow radius
        fontFamily: "Source-Sans-Pro-Bold", // Replace with your font name if needed
        marginRight: 4, // Add space between "OF" and "EVENTS"
        marginTop: 15,
    },
    highlight: {
        fontSize: 45, // Larger font size
        fontWeight: "bold",
        color: "#8D2424",
        fontFamily: "Source-Sans-Pro-Bold",
        textAlign: "center",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    eventList: {
        padding: 16,
    },
    eventContainer: {
        flexDirection: "row",
        marginBottom: 16,
        alignItems: "center",
    },
    dateContainer: {
        backgroundColor: "#1f2a50",
        borderRadius: 15,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
        width: 90,
    },
    monthText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Source-Sans-Pro-Bold",
    },
    dayText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 25,
        fontFamily: "Source-Sans-Pro-Bold",
    },
    eventDetails: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    eventTitle: {
        fontWeight: "bold",
        fontSize: 23,
        color: "#8D2424",
        fontFamily: "Source-Sans-Pro-Bold",
        textShadowColor: "#ca9b65",
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 1,
    },
    eventInfo: {
        color: "#8D2424",
        fontSize: 17,
        fontWeight: "bold",
        fontFamily: "Source-Sans-Pro-Bold", // Replace with your font name if needed
    },
});

export default Calendar;
