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
  ActivityIndicator,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [infoHeader, setInfoHeader] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();

  const [animation] = useState(new Animated.Value(0));

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
      image: require("../../Images/castle.jpg"),
      image2: require("../../Images/castle2.jpg"),
      image3: require("../../Images/castle3.jpg"),
      image4: require("../../Images/castle4.jpg"),
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
      image: require("../../Images/castle.jpg"),
      image2: require("../../Images/castle2.jpg"),
      image3: require("../../Images/castle3.jpg"),
      image4: require("../../Images/castle4.jpg"),
    },
  ];

  useEffect(() => {
    const getUserLocation = async () => {
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

  const handleLocate = () => {
    if (selectedLocation) {
      navigation.navigate("Locate", {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);

    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleImageChange = (newImage) => {
    setCurrentImage(newImage);
  };

  const containerHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.45, height * 0.31],
  });

  const containerTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.42, height * 0.435],
  });

  return (
    <View style={styles.container}>
      {userLocation ? (
        <MapView
          style={styles.map}
          region={region}
          mapType="hybrid"
          coordinate={userLocation}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
        >
          <Marker
            coordinate={userLocation}
            title="Your Location"
            description="This is where you are"
          />
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#761d1d" />
          <Text style={styles.loadingText}>Loading your location...</Text>
        </View>
      )}

      <View style={styles.overlay}>
        {selectedLocation && (
          <>
            {isExpanded && (
              <Image
                source={currentImage || selectedLocation.image}
                style={styles.expandedImage}
                resizeMode="cover"
              />
            )}
            <Animated.View
              style={[
                styles.infoContainer,
                {
                  height: containerHeight,
                  top: containerTop,
                },
              ]}
            >
              {isExpanded ? (
                <ScrollView contentContainerStyle={styles.expandedScrollContent}>
                  <View style={styles.expandedContent}>
                    <Text style={styles.expandedInfoHeader}>{infoHeader}</Text>
                    <Text style={styles.expandedDescription}>
                      {selectedLocation.fullDescription}
                    </Text>
                  </View>
                </ScrollView>
              ) : (
                <View style={styles.collapsedContent}>
                  <Image
                    source={selectedLocation.image}
                    style={styles.locationImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.infoHeader}>{infoHeader}</Text>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.infoText}>
                      {selectedLocation.description}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.viewContainer}
                  onPress={toggleExpanded}
                >
                  <Text style={styles.viewText}>
                    {isExpanded ? "Show Less" : "View Full Information >"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.locateButton}
                  onPress={handleLocate}
                >
                  <Text style={styles.buttonText}>Locate</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            {isExpanded && (
              <View style={styles.pickerPicture}>
                <TouchableOpacity
                  onPress={() => handleImageChange(selectedLocation.image2)}
                >
                  <Image
                    source={selectedLocation.image2}
                    resizeMode="cover"
                    style={styles.componentPic}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleImageChange(selectedLocation.image3)}
                >
                  <Image
                    source={selectedLocation.image3}
                    resizeMode="cover"
                    style={styles.componentPic}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleImageChange(selectedLocation.image4)}
                >
                  <Image
                    source={selectedLocation.image4}
                    resizeMode="cover"
                    style={styles.componentPic}
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      <View
        style={[
          styles.searchBar,
          keyboardVisible && styles.searchBarKeyboardVisible,
        ]}
      >
        <Icon
          name="search"
          size={width * 0.05}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder="Search for a destination"
          style={styles.inputLoc}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: height * 0.02,
    fontSize: width * 0.04,
    color: "#555",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  searchBar: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.025,
    right: width * 0.025,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1eee7",
    borderTopRightRadius: width * 0.025,
    borderTopLeftRadius: width * 0.025,
    borderBottomWidth: 5,
    borderBottomColor: "#000",
    padding: width * 0.025,
    zIndex: 1,
  },
  icon: {
    marginRight: width * 0.025,
  },
  inputLoc: {
    flex: 1,
    fontSize: width * 0.04,
  },
  infoContainer: {
    position: "absolute",
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: width * 0.025,
  },
  expandedScrollContent: {
    flexGrow: 1,
  },
  collapsedContent: {
    flex: 1,
  },
  expandedImage: {
    position: "absolute",
    top: height * 0.15,
    height: height * 0.28,
    width: width * 0.9,
    borderRadius: width * 0.025,
  },
  pickerPicture: {
    bottom: height * 0.02,
    width: width * 0.9,
    top: height * 0.755,
    height: height * 0.12,
    backgroundColor: "#1f2a50",
    borderRadius: width * 0.025,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  componentPic: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.02,
  },
  locationImage: {
    width: "100%",
    height: height * 0.2,
    borderTopLeftRadius: width * 0.025,
    borderTopRightRadius: width * 0.025,
  },
  infoHeader: {
    fontSize: width * 0.06,
    backgroundColor: "#f9b210",
    textAlign: "center",
    fontFamily: "Anton-Regular",
  },
  expandedInfoHeader: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginVertical: height * 0.02,
    color: "#222",
    textAlign: "center",
  },
  expandedDescription: {
    fontSize: width * 0.04,
    lineHeight: height * 0.032,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  descriptionContainer: {
    padding: width * 0.04,
  },
  infoText: {
    fontSize: width * 0.035,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  viewContainer: {
    padding: width * 0.025,
  },
  viewText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
  locateButton: {
    backgroundColor: "#007bff",
    padding: width * 0.025,
    borderRadius: width * 0.01,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
  expandedContent: {
    flex: 1,
  },
});

export default Map;