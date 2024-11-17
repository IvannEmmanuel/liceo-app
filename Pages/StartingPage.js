import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const StartingPage = () => {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.getStarted} onPress={handlePress}>
        <Text style={styles.textStarted}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartingPage;

const styles = StyleSheet.create({
  textStarted: {
    textAlign: "center",
    fontSize: 21,
    fontFamily: "Jakarta-Semibold",
  },
  getStarted: {
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
    width: 200,
    height: 70,
    backgroundColor: "#339bfd",
  },
  container: {
    backgroundColor: "#162a40",
    justifyContent: 'center',
    flex: 1,
  },
});
