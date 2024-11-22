import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Importing MaterialCommunityIcons for icons

const NotificationContext = ({ notification, onClose }) => {
    const navigation = useNavigation();

    const handleViewPress = () => {
        onClose(); // Close the modal first
        navigation.navigate('Dashboard', {
          screen: 'Notification',
          params: { screen: 'Founding' }
        });
      }
    
    return (
        <View style={styles.notificationContainer}>
            {/* Bell Icon in Circular Container */}
            <View style={styles.bellContainer}>
                <Icon name="bell" size={60} color="#fbd965" />
            </View>
            {/* Header */}
            <View style={styles.header}>
                <Image source={notification.image} style={styles.logo} />
                <Image
                    source={require("../../Images/megaphone.png")} // Corrected path for the image
                    style={styles.megaphoneIcon}
                />
            </View>
            {/* Text Container */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.message}>{notification.message}</Text>
            </View>
            {/* Buttons */}
            <View style={styles.buttons}>
                <TouchableOpacity onPress={onClose} style={styles.button}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleViewPress}>
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationContainer: {
        width: "80%",
        padding: 20,
        backgroundColor: "#1f1f1f",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginVertical: 10,
        alignItems: "center",
        position: "relative", // Keeps the bell icon positioned absolutely within this container
        borderWidth: 3, // Add border width
        borderColor: "#161616", // Set border color to white
        paddingBottom: -5,
    },
    bellContainer: {
        position: "absolute",
        top: -45, // Adjust this to position the bell icon outside the notification container
        left: "56%", // Position the bell container horizontally in the center
        transform: [{ translateX: -45 }], // Center the bell icon by shifting it left by half its width
        width: 90,
        height: 90,
        backgroundColor: "#1f1f1f", // Black background color
        borderRadius: 45, // Circular border radius
        justifyContent: "center",
        alignItems: "center",
        elevation: 6, // Add shadow for better visibility
        borderWidth: 3, // Add border width
        borderColor: "#161616", // Set border color to white
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10, // Provides space for the bell icon
    },
    logo: {
        width: 50,
        height: 50,
    },
    megaphoneIcon: {
        width: 30, // Adjust the width of the megaphone image
        height: 30, // Adjust the height of the megaphone image
    },
    textContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        paddingVertical: 10,
        width: "49%", // Adjust the button width to center the text properly
        borderRadius: 5,
        backgroundColor: "#1f1f1f",
        alignItems: "center", // Center the text inside the button
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
});

export default NotificationContext;
