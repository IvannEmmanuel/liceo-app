import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Profile = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [infoHeader, setInfoHeader] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added from the development branch
  const navigation = useNavigation();

  const [animation] = useState(new Animated.Value(0));
  const [subContainerAnimation] = useState(new Animated.Value(0));

  const [region, setRegion] = useState({
    latitude: 8.485858,
    longitude: 124.639341,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const locations = [
    {
      name: "Pharmacy Office",
      latitude: 8.485858,
      longitude: 124.639341,
      description:
        "Approximate time and distance from your current location. Click the 'LOCATE' button to start navigating.",
      fullDescription:
        "The Pharmacy Office provides essential medical supplies and prescriptions to the local community. Our experienced staff offers professional pharmaceutical services and guidance. We maintain a comprehensive inventory of medications and health-related products to meet your healthcare needs.",
      operatingHours:
        "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM",
      contact: "(123) 456-7890",
      email: "pharmacy@example.com",
      image: require("../../Images/castle.jpg"),
      image2: require("../../Images/castle2.jpg"),
      image3: require("../../Images/castle3.jpg"),
      image4: require("../../Images/castle4.jpg"),
    },
    // Other location objects...
  ];

  useEffect(() => {
    const getUserLocation = async () => {
      setIsLoading(true); // Show loading indicator
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        console.error("Location permission denied");
      }
      setIsLoading(false); // Hide loading indicator
    };
    getUserLocation();

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (userLocation) {
      setRegion({
        latitude: 8.485858,
        longitude: 124.639341,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  }, [userLocation]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const foundLocation = locations.find(
      (location) => location.name.toLowerCase() === query
    );
    if (foundLocation) {
      setSelectedLocation(foundLocation);
      setInfoHeader(searchQuery.toUpperCase());
      setIsExpanded(false);
      setCurrentImage(foundLocation.image);
    } else {
      setSelectedLocation(null);
      setInfoHeader("");
      setCurrentImage(null);
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Show loading spinner */}
      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" />
      ) : userLocation ? (
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={userLocation}
            title="Your Location"
            description="This is where you are"
          />
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Loading your location...</Text>
      )}

      {/* Other components go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingIndicator: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { textAlign: "center", fontSize: 16, marginTop: 20 },
});

export default Profile;
