import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getCurrentPosition } from "react-native-geolocation-service";

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [infoHeader, setInfoHeader] = useState("");
  const navigation = useNavigation();

  // Location data can be dynamic and extended with more locations
  const locations = [
    {
      name: "Pharmacy Office",
      latitude: 8.485858,
      longitude: 124.639341,
      description:
        "Approximate time and distance from your current location. Click the “LOCATE” button to start navigating.",
      image: require("../../Images/castle.jpg"),
    },
    {
      name: "Next Moves Dance Company",
      latitude: 8.485452,
      longitude: 124.639237,
      description:
        "Approximate time and distance from your current location. Click the “LOCATE” button to start navigating.",
      image: require("../../Images/castle.jpg"),
    },
    {
      name: "Kabina",
      latitude: 8.504217,
      longitude: 124.644259,
      description:
        "Approximate time and distance from your current location. Click the “LOCATE” button to start navigating.",
      image: require("../../Images/castle.jpg"),
    },
  ];

  // Request user's location
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
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const foundLocation = locations.find(
      (location) => location.name.toLowerCase() === query
    );
    if (foundLocation) {
      setSelectedLocation(foundLocation);
      setInfoHeader(searchQuery.toUpperCase()); // Set infoHeader when search is confirmed
    } else {
      setSelectedLocation(null);
      setInfoHeader(""); // Reset infoHeader if location not found
    }
  };

  const handleLocate = () => {
    if (selectedLocation) {
      navigation.navigate("Locate", {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      {userLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          mapType="hybrid"
        >
          {/* User Location Marker */}
          <Marker
            coordinate={userLocation}
            title="Your Location"
            description="This is where you are"
          />

          {/* Searched Location Marker */}
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={selectedLocation.name}
              description={selectedLocation.description}
            />
          )}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Loading your location...</Text>
      )}

      {/* Search Bar */}
      <View style={styles.searchBar}>
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

      {/* Location Details */}
      {selectedLocation && (
        <View style={styles.infoContainer}>
          <Image
            source={selectedLocation.image}
            style={styles.locationImage}
            resizeMode="cover"
          />
          <Text style={styles.infoHeader}>{infoHeader}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.infoText}>{selectedLocation.description}</Text>
            <TouchableOpacity style={styles.viewContainer}>
              <Text style={styles.viewText}>View Full Information {">"}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.locateButton} onPress={handleLocate}>
            <Text style={styles.buttonText}>Locate</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewText: {
    position: "absolute",
    left: 140,
    marginVertical: -8,
    fontWeight: "800",
    fontSize: 13,
  },
  descriptionContainer: {
    padding: 15,
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    position: "absolute",
    top: 30,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1eee7",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: "#000000",
    borderBottomWidth: 4,
    elevation: 3,
    zIndex: 10,
  },
  inputLoc: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  infoContainer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 10,
    backgroundColor: "#fff",
    elevation: 5,
    width: "80%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  locationImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: "bold",
    height: 40,
    marginBottom: 5,
    backgroundColor: "#f9b210",
    textAlign: "center",
    lineHeight: 40,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  locateButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Map;
