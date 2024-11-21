import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Get device dimensions

const FoundingAnniversary = () => {
    return (
        <ImageBackground
            source={require("../../../Images/CalendarBackground.jpg")}
            style={[styles.container, { width, height }]}
            resizeMode="cover"
        >
            <View style={styles.subContainer}>
                <View style={styles.titleContainer}>
                    <Image
                        source={require("../../../Images/liceo-maroon.png")}
                        style={styles.logo}
                    />
                    <Text styles={styles.textContainer}>
                        70TH FOUNDING {"\n"} ANNIVERSARY
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};

export default FoundingAnniversary;

const styles = StyleSheet.create({
    textContainer: {
        color: "white",
        fontSize: 20,
        alignSelf: "center",
    },
    logo: {
        height: height * 0.15,
        width: width * 0.3,
        marginHorizontal: 20,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    subContainer: {
        backgroundColor: "#1f2a50",
        width: "90%",
        borderRadius: 20,
        height: "90%",
    },
    titleContainer: {
        flexDirection: "row",
    },
});
