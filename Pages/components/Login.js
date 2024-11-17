import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Here you can add logic for authentication, for example, using Firebase, API, etc.
    if (email && password) {
      // Simulating a successful login
      Alert.alert("Success", "Login successful!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Dashboard"), // Redirect to Dashboard or any other screen
        },
      ]);
    } else {
      Alert.alert("Error", "Please enter your email and password.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={{color: '#f9b210'}}>
          WELCOME TO {"\n"} ExploreLDCU!
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#761d1d",
    padding: 20,
  },
});
