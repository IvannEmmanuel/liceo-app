import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import loadFonts from "../../Style/load";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const LoginPage = () => {
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

  const handleLogin = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.welcomeText}>WELCOME TO{"\n"}ExploreLDCU!</Text>
          <View style={styles.loginContainer}>
            <Text style={styles.headerText}>LOGIN WITH CORPORATE ACCOUNT</Text>
            <View style={styles.usernameRow}>
              <Text style={styles.usernameText}>Username:</Text>
              <TextInput style={styles.usernameInput} />
            </View>
            <View style={styles.passwordRow}>
              <Text style={styles.passwordText}>Password:</Text>
              <TextInput style={styles.passwordInput} secureTextEntry={true} />
            </View>
            <View style={styles.entervisitContainer}>
              <TouchableOpacity
                style={styles.enterContainer}
                onPress={handleLogin}
              >
                <Text style={styles.enterText}>ENTER</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>OR</Text>
              <TouchableOpacity style={styles.visitorContainer}>
                <Text style={styles.visitorText}>LOGIN AS VISITOR</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Image
              source={require("../../Images/liceo.png")}
              style={styles.logo}
            />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                color: "white",
              }}
            >
              Property Of
            </Text>
            <Text
              style={{
                fontFamily: "Anton-Regular",
                color: "white",
              }}
            >
              Grade 12 - STEM 30 ( RESEARCH GROUP 1)
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                color: "white",
              }}
            >
              Liceo de Cagayan University - Main Campus
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: "center",
    marginVertical: height * 0.02, // Adjust margin based on screen size
  },
  logo: {
    width: width * 0.3, // Adjust width based on screen size
    height: width * 0.3, // Adjust height based on screen size
  },
  visitorContainer: {
    backgroundColor: "#761d1d",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 45,
    alignSelf: "center",
    marginVertical: 10,
  },
  visitorText: {
    color: "#f9b210",
    backgroundColor: "#761d1d",
    fontSize: height * 0.03, // Adjust font size based on screen size
    fontFamily: "Anton-Regular",
    width: "100%",
    height: 45,
    textAlignVertical: "center",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 20,
  },
  orText: {
    color: "#f9b210",
    fontSize: height * 0.03, // Adjust font size based on screen size
    textAlign: "center",
    fontFamily: "Anton-Regular",
  },
  enterContainer: {
    color: "#f9b210",
    backgroundColor: "#761d1d",
    fontSize: height * 0.03, // Adjust font size based on screen size
    fontFamily: "Anton-Regular",
    height: 45,
    textAlignVertical: "center",
    width: "40%",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 20,
  },
  enterText: {
    color: "#f9b210",
    backgroundColor: "#761d1d",
    fontSize: height * 0.03, // Adjust font size based on screen size
    fontFamily: "Anton-Regular",
    height: 45,
    textAlignVertical: "center",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 20,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.02, // Adjust margin based on screen size
  },
  passwordInput: {
    backgroundColor: "#F2F2F2",
    width: "50%",
    height: 35,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: height * 0.02, // Adjust font size based on screen size
    fontWeight: "800",
  },
  passwordText: {
    color: "#f9b210",
    fontFamily: "Anton-Regular",
    backgroundColor: "#761d1d",
    textAlign: "center",
    textAlignVertical: "center",
    width: "30%",
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginHorizontal: 25,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  usernameInput: {
    backgroundColor: "#F2F2F2",
    width: "50%",
    height: 35,
    borderRadius: 20,
    fontSize: height * 0.02, // Adjust font size based on screen size
    fontWeight: "800",
    paddingHorizontal: 10,
  },
  usernameText: {
    color: "#f9b210",
    fontFamily: "Anton-Regular",
    backgroundColor: "#761d1d",
    textAlign: "center",
    textAlignVertical: "center",
    width: "30%",
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginHorizontal: 25,
  },
  headerText: {
    color: "white",
    fontSize: height * 0.03, // Adjust font size based on screen size
    bottom: 10,
    textAlign: "center",
    fontFamily: "Anton-Regular",
  },
  loginContainer: {
    backgroundColor: "#1f2a50",
    width: "90%",
    alignSelf: "center",
    borderRadius: 30,
    paddingVertical: height * 0.05, // Adjust padding based on screen size
  },
  welcomeText: {
    bottom: 10,
    textAlign: "center",
    fontSize: height * 0.08, // Adjust font size based on screen size
    fontFamily: "Anton-Regular",
    color: "#f9b210",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#761d1d",
  },
});
