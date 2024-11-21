import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import loadFonts from "../../Style/load";
import { useState, useEffect } from "react";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const Profile = () => {
    const [silentMode, setSilentMode] = React.useState(false);
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

    const userInfo = [
        { label: "Fullname", value: "User", icon: "account" },
        { label: "Phone Number", value: "+123-456-7890", icon: "phone" },
        {
            label: "Address",
            value: "123 Anywhere St., Any City, ST 12345",
            icon: "map-marker",
        },
        { label: "Language", value: "English", icon: "earth" },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            {/* Profile Section */}
            <ScrollView>
                <View style={styles.profileContainer}>
                    <View style={styles.profileIconContainer}>
                        <Icon name="account-circle" size={80} color="#761d1d" />
                        <View style={styles.editIcon}>
                            <Icon name="pencil" size={16} color="#FFF" />
                        </View>
                    </View>
                    <Text style={styles.profileName}>User</Text>
                    <Text style={styles.profileDetails}>Grade 12 STEM 30</Text>
                    <Text style={styles.profileEmail}>user@liceo.edu.ph</Text>
                    <Text style={styles.welcomeText}>Welcome, USER!</Text>
                </View>

                {/* About Me Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About Me</Text>
                    {userInfo.slice(0, 3).map((info, index) => (
                        <InfoCard
                            key={index}
                            icon={info.icon}
                            label={info.label}
                            value={info.value}
                        />
                    ))}
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    {userInfo.slice(3).map((info, index) => (
                        <InfoCard
                            key={index}
                            icon={info.icon}
                            label={info.label}
                            value={info.value}
                        />
                    ))}
                    <View style={styles.row}>
                        <View style={styles.rowContent}>
                            {/* Volume Icon Container */}
                            <View style={styles.iconContainer}>
                                <Icon
                                    name={
                                        silentMode
                                            ? "volume-off"
                                            : "volume-high"
                                    }
                                    size={24}
                                    color="#FFF"
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.silentTitle}>
                                    Silent Mode
                                </Text>
                                <Text style={styles.rowSubtitle}>
                                    Notifications & Message
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={silentMode}
                            onValueChange={setSilentMode}
                            thumbColor={silentMode ? "#FF9800" : "#CCC"}
                            trackColor={{ true: "#FFCC80", false: "#EEE" }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const InfoCard = ({ icon, label, value }) => (
    <View style={styles.infoContainer}>
        <View style={styles.iconContainer}>
            <Icon name={icon} size={24} color="#FFF" />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.rowTitle}>{value}</Text>
            <Text style={styles.rowSubtitle}>{label}</Text>
        </View>
        <TouchableOpacity style={styles.redButton}>
            <Icon name="chevron-right" size={24} color="#FFF" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#1f2a50",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        width: width, // Ensure full width for the header
    },
    headerTitle: {
        color: "#FFF",
        fontSize: width * 0.05, // Scaling font size based on screen width
        fontWeight: "bold",
        fontFamily: "Poppins-Bold", // Apply Poppins-Bold font
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    statusIcons: {
        flexDirection: "row",
        gap: 8,
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: height * 0.02, // Margin based on screen height
    },
    profileIconContainer: {
        position: "relative",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#1f2a50",
        borderRadius: 12,
        padding: 4,
    },
    profileName: {
        fontSize: width * 0.05, // Font size relative to screen width
        fontWeight: "bold",
        color: "#263238",
        fontFamily: "Poppins-Bold", // Apply Poppins-Bold font
    },
    profileDetails: {
        fontWeight: "bold",
        fontSize: width * 0.04, // Adjust font size for details
        color: "#263238",
        fontFamily: "Poppins-Bold", // Apply Poppins-Bold font
    },
    profileEmail: {
        fontSize: width * 0.04, // Adjust font size for details
        color: "#757575",
        fontFamily: "Poppins-Bold", // Apply Poppins-Bold font
    },
    welcomeText: {
        fontSize: width * 0.05, // Welcome text scaling
        fontWeight: "bold",
        color: "#8D2424",
        fontFamily: "Poppins-Bold", // Apply Poppins-Bold font
    },
    section: {
        marginVertical: height * 0.01, // Vertical margin based on screen height
        paddingHorizontal: width * 0.04, // Horizontal padding based on width
    },
    sectionTitle: {
        fontSize: width * 0.05, // Section title size relative to screen width
        fontWeight: "bold",
        color: "#263238",
        marginBottom: 8,
        fontFamily: "Poppins-Bold", // Apply Poppins-Bold font
    },
    infoContainer: {
        flexDirection: "row",
        paddingVertical: height * 0.015, // Vertical padding based on screen height
        paddingHorizontal: width * 0.04, // Horizontal padding based on width
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#E0E0E0",
    },
    iconContainer: {
        backgroundColor: "#1f2a50",
        padding: 8,
        borderRadius: 8,
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    redButton: {
        backgroundColor: "#8D2424",
        borderRadius: 5,
        padding: 1, // Adjusted padding for better visibility
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: height * 0.02, // Vertical padding based on height
        paddingHorizontal: width * 0.04, // Horizontal padding
    },
    rowContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    rowTitle: {
        fontSize: width * 0.04, // Font size adjusted for responsiveness
        color: "#757575",
        fontFamily: "helvetica-world-regular", // Apply Poppins-Bold font
    },
    silentTitle: {
        fontSize: width * 0.04, // Font size adjusted for responsiveness
        color: "#263238",
        fontFamily: "helvetica-world-regular",
    },
    rowSubtitle: {
        fontSize: width * 0.035, // Font size for subtitle
        color: "#263238",
        fontFamily: "Poppins-Bold", // Apply Poppins-Bold font
    },
});

export default Profile;
