import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

const Founding = () => {
    return (
        <ImageBackground
            source={require("../../../Images/Calendar Background.jpg")} // Replace with your image path
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text>wow magic</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({});

export default Founding;
