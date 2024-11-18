import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Profile = () => {
    const [silentMode, setSilentMode] = React.useState(false);

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
            <View style={styles.header}></View>

            {/* Profile Section */}
            <ScrollView>
                <View style={styles.profileContainer}>
                    <View style={styles.profileIconContainer}>
                        <Icon name="account-circle" size={80} color="#FF9800" />
                        <View style={styles.editIcon}>
                            <Icon name="pencil" size={16} color="#FFF" />
                        </View>
                    </View>
                    <Text style={styles.profileName}>User</Text>
                    <Text style={styles.profileDetails}>Grade 12 STEM 30</Text>
                    <Text style={styles.profileDetails}>user@liceo.edu.ph</Text>
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
                            <Icon name="bell-off" size={24} color="#263238" />
                            <View style={styles.textContainer}>
                                <Text style={styles.rowTitle}>Silent Mode</Text>
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
    container: {
        flex: 1,
        backgroundColor: "#FFF", // Set background color to white
    },
    header: { height: 40, backgroundColor: "transparent" },
    time: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    statusIcons: {
        flexDirection: "row",
        gap: 8,
    },
    profileContainer: {
        alignItems: "center",
        marginVertical: 16,
    },
    profileIconContainer: {
        position: "relative",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#FF9800",
        borderRadius: 12,
        padding: 4,
    },
    profileName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#263238",
        marginTop: 8,
    },
    profileDetails: {
        fontSize: 14,
        color: "#757575",
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#8D2424",
        marginTop: 16,
    },
    section: {
        marginVertical: 8,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#263238",
        marginBottom: 8,
    },
    infoContainer: {
        flexDirection: "row",
        padding: 12,
        alignItems: "center",
        borderBottomWidth: 1, // Top border
        borderColor: "#E0E0E0", // Light gray border color
    },
    iconContainer: {
        backgroundColor: "#1f2a50", // Background color for icons
        padding: 8,
        borderRadius: 8,
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    redButton: {
        backgroundColor: "#8D2424",
        borderRadius: 8,
        padding: 2,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16, // Ensure padding on both sides for better spacing
    },
    rowContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1, // Ensures the icons and text are spaced properly
    },
    rowTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#263238",
    },
    rowSubtitle: {
        fontSize: 12,
        color: "#757575",
    },
});

export default Profile;