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

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [infoHeader, setInfoHeader] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      images: [
        require("../../Images/pharmacy1.jpg"),
        require("../../Images/pharmacy2.jpg"),
        require("../../Images/pharmacy3.jpg"),
        require("../../Images/pharmacy4.jpg"),
      ],
    },
    {
      name: "Next Moves Dance Company",
      latitude: 8.485452,
      longitude: 124.639237,
      description:
        "Approximate time and distance from your current location. Click the 'LOCATE' button to start navigating.",
      fullDescription:
        "Next Moves Dance Company is a premier dance studio offering various dance styles and classes for all ages and skill levels. Our professional instructors are dedicated to helping you achieve your dancing goals in a fun and supportive environment.",
      operatingHours: "Monday - Saturday: 9:00 AM - 8:00 PM",
      contact: "(123) 456-7891",
      email: "nextmoves@example.com",
      images: [
        require("../../Images/dance1.jpg"),
        require("../../Images/dance2.jpg"),
        require("../../Images/dance3.jpg"),
        require("../../Images/dance4.jpg"),
      ],
    },
    {
      name: "Kabina",
      latitude: 8.504217,
      longitude: 124.644259,
      description:
        "Approximate time and distance from your current location. Click the 'LOCATE' button to start navigating.",
      fullDescription:
        "Kabina offers a unique dining experience with a blend of traditional and modern cuisine. Our restaurant features locally sourced ingredients and a carefully curated menu that changes seasonally. Enjoy the warm atmosphere and exceptional service.",
      operatingHours: "Daily: 11:00 AM - 10:00 PM",
      contact: "(123) 456-7892",
      email: "kabina@example.com",
      images: [
        require("../../Images/kabina1.jpg"),
        require("../../Images/kabina2.jpg"),
        require("../../Images/kabina3.jpg"),
        require("../../Images/kabina4.jpg"),
      ],
    },
  ];

  useEffect(() => {
    const initializeMap = async () => {
      setIsLoading(true);
      try {
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
      } catch (error) {
        console.error("Error getting location: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeMap();

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

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const foundLocation = locations.find(
      (location) => location.name.toLowerCase() === query
    );
    if (foundLocation) {
      setSelectedLocation(foundLocation);
      setInfoHeader(searchQuery.toUpperCase());
      setIsExpanded(false);
      setCurrentImageIndex(0);
    } else {
      setSelectedLocation(null);
      setInfoHeader("");
    }
    Keyboard.dismiss();
  };

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const handleNextImage = () => {
    if (selectedLocation) {
      setCurrentImageIndex(
        (currentImageIndex + 1) % selectedLocation.images.length
      );
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView style={styles.map} region={region}>
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="Your Location"
              description="This is where you are"
            />
          )}
          {locations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
              description={location.description}
            />
          ))}
        </MapView>
      )}
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.input}
            placeholder="Search location"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        {selectedLocation && (
          <Animated.View style={[styles.infoContainer, { opacity: animation }]}>
            <ScrollView>
              <Text style={styles.infoHeader}>{infoHeader}</Text>
              <Image
                source={selectedLocation.images[currentImageIndex]}
                style={styles.image}
              />
              <TouchableOpacity onPress={handleNextImage}>
                <Text style={styles.nextImageText}>Next Image</Text>
              </TouchableOpacity>
              <Text style={styles.infoText}>
                {isExpanded
                  ? selectedLocation.fullDescription
                  : selectedLocation.description}
              </Text>
              <TouchableOpacity onPress={toggleExpanded}>
                <Text style={styles.toggleButton}>
                  {isExpanded ? "See Less" : "See More"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  input: { padding: 8, borderBottomWidth: 1, marginBottom: 10 },
  searchButton: {
    backgroundColor: "#3498db",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  infoContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  infoHeader: { fontWeight: "bold", fontSize: 16 },
  image: { width: "100%", height: 200, marginBottom: 10 },
  nextImageText: { color: "#3498db", textAlign: "center", marginBottom: 10 },
  infoText: { fontSize: 14 },
  toggleButton: { color: "#3498db", marginTop: 10 },
});

export default Map;
