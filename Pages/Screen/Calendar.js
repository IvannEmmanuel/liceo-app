import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Dimensions,
} from "react-native";
import loadFonts from "../../Style/load";

const { width, height } = Dimensions.get("window"); // Get device dimensions

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
        {
            date: "TBA",
            title: "TO BE ANNOUNCED",
        },
        {
            date: "TBA",
            title: "TO BE ANNOUNCED",
        },
        {
            date: "TBA",
            title: "TO BE ANNOUNCED",
        },
        {
            date: "TBA",
            title: "TO BE ANNOUNCED",
        },
        {
            date: "TBA",
            title: "TO BE ANNOUNCED",
        },
        {
            date: "TBA",
            title: "TO BE ANNOUNCED",
        },
        {
            date: "TBA",
            title: "TO BE ANNOUNCED",
        },
    ];

    return (
        <ImageBackground
            source={require("../../Images/CalendarBackground.jpg")} // Replace with your image path
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
    header: { height: height * 0.05, backgroundColor: "transparent" },
    titleContainer: {
        marginTop: height * 0.02,
        alignItems: "center",
    },
    highlightsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: -height * 0.015,
    },
    title: {
        fontSize: height * 0.05,
        fontWeight: "bold",
        color: "#8D2424",
        fontFamily: "Source-Sans-Pro-Bold",
        textAlign: "center",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    highlightSmall: {
        fontSize: height * 0.025,
        fontWeight: "bold",
        color: "#8D2424",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        fontFamily: "Source-Sans-Pro-Bold",
        marginRight: width * 0.02,
        marginTop: height * 0.015,
    },
    highlight: {
        fontSize: height * 0.05,
        fontWeight: "bold",
        color: "#8D2424",
        fontFamily: "Source-Sans-Pro-Bold",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    eventList: {
        padding: width * 0.04,
    },
    eventContainer: {
        flexDirection: "row",
        marginBottom: height * 0.02,
        alignItems: "center",
    },
    dateContainer: {
        backgroundColor: "#1f2a50",
        borderRadius: width * 0.04,
        padding: width * 0.03,
        paddingHorizontal: width * 0.01,
        justifyContent: "center",
        alignItems: "center",
        marginRight: width * 0.04,
        width: width * 0.2,
    },
    monthText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: height * 0.03,
        fontFamily: "Source-Sans-Pro-Bold",
    },
    dayText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: height * 0.025,
        fontFamily: "Source-Sans-Pro-Bold",
    },
    eventDetails: {
        flex: 1,
        justifyContent: "center",
    },
    eventTitle: {
        fontWeight: "bold",
        fontSize: height * 0.028,
        color: "#8D2424",
        fontFamily: "Source-Sans-Pro-Bold",
        textShadowColor: "#ca9b65",
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 1,
    },
    eventInfo: {
        color: "#8D2424",
        fontSize: height * 0.02,
        fontWeight: "bold",
        fontFamily: "Source-Sans-Pro-Bold",
    },
});

export default Calendar;
