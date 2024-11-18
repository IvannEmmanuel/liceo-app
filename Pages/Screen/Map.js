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
        name: selectedLocation.infoHeader,
      });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);

    Animated.parallel([
      Animated.timing(animation, {
        toValue: isExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(subContainerAnimation, {
        toValue: isExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleImageChange = (newImage) => {
    setCurrentImage(newImage);
  };

  const containerHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [280, Dimensions.get("window").height * 0.8],
  });

  const subContainerTop = subContainerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [350, 395], // Adjust these values to control subcontainer movement
  });

  const infoContainerBottom = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 100],
  });

  return (
    <View style={styles.container}>
      {/* Map as Background */}
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
        <Text style={styles.loadingText}>Loading your location...</Text>
      )}

      {/* Overlay Content */}
      <View style={styles.overlay}>
        {selectedLocation && (
          <Animated.View
          style={[styles.infoContainer, { bottom: infoContainerBottom }]}
          pointerEvents={isExpanded ? "auto" : "box-none"} // Allow touches to pass through when collapsed
        >
            {isExpanded && (
              <View style={styles.imageContainer}>
                <Image
                  source={currentImage || selectedLocation.image}
                  style={styles.expandedImage}
                  resizeMode="cover"
                />
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
              </View>
            )}
            <Animated.View
              style={[styles.subContainer, { top: subContainerTop }]}
            >
              <ScrollView>
                {isExpanded ? (
                  <View style={styles.expandedContent}>
                    <Text style={styles.expandedInfoHeader}>{infoHeader}</Text>
                    <ScrollView style={styles.scrollableDescription}>
                      <Text style={styles.expandedDescription}>
                        {selectedLocation.fullDescription}
                      </Text>
                    </ScrollView>
                  </View>
                ) : (
                  <>
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
                  </>
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
              </ScrollView>
            </Animated.View>
          </Animated.View>
        )}
      </View>

      <View
        style={[
          styles.searchBar,
          keyboardVisible && styles.searchBarKeyboardVisible,
        ]}
      >
        <Icon name="search" size={20} color="#888" style={styles.icon} />
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
  map:{
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  searchBar: {
    position: "absolute",
    top: "5%",
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1eee7",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomWidth: 5,
    borderBottomColor: "#000",
    padding: 10,
    zIndex: 1,
  },
  icon: {
    marginRight: 10,
  },
  inputLoc: {
    flex: 1,
  },
  imageContainer: {
    width: "95%",
  },
  subContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
  },
  pickerPicture: {
    position: "absolute",
    width: "100%",
    height: 100,
    borderRadius: 10,
    top: 680,
    backgroundColor: "#1f2a50",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  componentPic: {
    width: 80,
    height: 80,
    alignSelf: "center",
    borderRadius: 8,
  },
  expandedImage: {
    position: "absolute",
    height: 180,
    width: "100%",
    top: 205,
    borderRadius: 20,
  },
  locationImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoHeader: {
    fontSize: 25,
    backgroundColor: "#f9b210",
    textAlign: "center",
    fontFamily: "Anton-Regular",
  },
  expandedInfoHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#222",
    textAlign: "center",
  },
  expandedDescription: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  descriptionContainer: {
    padding: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 15,
    bottom: 20,
  },
  viewContainer: {
    padding: 10,
  },
  viewText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  locateButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  expandedContent: {
    padding: 15,
    top: 10,
  },
  expandedInfoHeader: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Anton-Regular",
  },
  expandedDescription: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  scrollableDescription: {
    maxHeight: 150,
  },
});

export default Profile;
