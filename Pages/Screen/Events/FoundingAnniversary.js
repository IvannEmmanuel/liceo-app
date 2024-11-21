import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import loadFonts from "../../../Style/load";

const { width, height } = Dimensions.get("window"); // Get device dimensions

const FoundingAnniversary = () => {
    const navigation = useNavigation();
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
    const handleClose = () => {
        navigation.navigate("Dashboard");
    };

    return (
        <ImageBackground
            source={require("../../../Images/CalendarBackground.jpg")}
            style={[styles.container, { width, height }]}
            resizeMode="cover"
        >
            <View style={styles.cardContainer}>
                {/* Logo and Title (Side by Side) */}
                <View style={styles.headerContainer}>
                    <Image
                        source={require("../../../Images/liceo-maroon.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.titleText}>
                        70TH FOUNDING ANNIVERSARY
                    </Text>
                </View>

                {/* Agenda */}
                <Text style={styles.sectionTitle}>AGENDA:</Text>
                <Text style={styles.bodyText}>
                    TO CELEBRATE LICEO DE CAGAYAN UNIVERSITY'S FOUNDING
                    ANNIVERSARY, WITH EXCITING EVENTS AND ACTIVITIES
                </Text>

                {/* Venue */}
                <Text style={styles.sectionTitle}>VENUE:</Text>
                <Text style={styles.bodyText}>
                    @LICEO CIVIC CENTER, MAIN CAMPUS
                </Text>

                {/* Date & Time */}
                <Text style={styles.sectionTitle}>DATE & TIME:</Text>
                <Text style={styles.bodyText}>FEBRUARY 21-25, 2024</Text>

                {/* Close Button */}
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClose}
                >
                    <Text style={styles.closeButtonText}>CLOSE</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default FoundingAnniversary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    cardContainer: {
        backgroundColor: "#1f2a50",
        width: "90%",
        borderRadius: height * 0.02, // Adjust border radius relative to height
        padding: width * 0.05, // Padding relative to width
        alignItems: "center",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: height * 0.02, // Spacing relative to height
    },
    logo: {
        height: height * 0.1, // Logo height relative to screen height
        width: width * 0.2, // Logo width relative to screen width
        marginRight: width * 0.03, // Space between logo and text
    },
    titleText: {
        color: "white",
        fontSize: width * 0.075, // Font size relative to width
        fontWeight: "bold",
        textAlign: "center",
        flexShrink: 1, // Prevent text overflow
        fontFamily: "Source-Sans-Pro-Bold",
    },
    sectionTitle: {
        color: "#f1eee7",
        fontSize: width * 0.06, // Font size relative to width
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginTop: height * 0.015, // Margin relative to height
        borderRadius: width * 0.02, // Border radius relative to width
        fontFamily: "Source-Sans-Pro-Bold",
    },
    bodyText: {
        backgroundColor: "#737373",
        marginTop: height * 0.01, // Margin relative to height
        padding: width * 0.04, // Padding relative to width
        borderRadius: width * 0.05, // Border radius relative to width
        color: "white",
        fontSize: width * 0.055, // Font size relative to width
        lineHeight: height * 0.03, // Line height relative to height
        textAlign: "center",
        width: "95%",
        fontFamily: "Source-Sans-Pro-Bold",
    },
    closeButton: {
        marginTop: height * 0.03, // Spacing relative to height
        backgroundColor: "#761d1d",
        paddingVertical: height * 0.01, // Vertical padding relative to height
        paddingHorizontal: width * 0.1, // Horizontal padding relative to width
        borderRadius: width * 0.025, // Border radius relative to width
    },
    closeButtonText: {
        color: "white",
        fontSize: width * 0.065, // Font size relative to width
        fontWeight: "bold",
        fontFamily: "Source-Sans-Pro-Bold",
    },
});
