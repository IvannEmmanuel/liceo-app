import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, PermissionsAndroid, Platform } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";
import polyline from "@mapbox/polyline";

const MyMap = () => {
  const mapRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [region, setRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const pharmacyLocation = {
    name: "Pharmacy Office",
    latitude: 8.485841,
    longitude: 124.63936,
  };

  const bookCenterLocation = {
    name: "Book Center Office",
    latitude: 8.485080,
    longitude: 124.638888,
  };

  const googleApiKey = "AlzaSyJ-7bx94F4YsL44lzOqdUXgClf2ach4mRo";

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const getRoute = async (start, destination) => {
    if (!start || !destination) return;
    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${destination.latitude},${destination.longitude}&key=${googleApiKey}`
      );

      if (response.data.status === "OK") {
        const points = response.data.routes[0]?.overview_polyline?.points;
        if (points) {
          const coordinates = decodePolyline(points);
          setRouteCoordinates(coordinates);
        }
      } else {
        console.error("Directions API Error:", response.data.error_message || response.data.status);
      }
    } catch (error) {
      console.error("Error fetching route:", error.message);
    }
  };

  const decodePolyline = (encoded) => {
    return polyline.decode(encoded).map(([lat, lng]) => ({
      latitude: lat,
      longitude: lng,
    }));
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newRegion = {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setRegion(newRegion);
            setCurrentLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting current location:", error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    if (selectedLocation && currentLocation) {
      getRoute(currentLocation, selectedLocation);
    }
  }, [selectedLocation, currentLocation]);

  useEffect(() => {
    if (region && mapRef.current) {
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [region]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for buildings (e.g., Pharmacy)"
        value={searchText}
        onChangeText={handleSearch}
      />
      {searchText.toLowerCase().includes("pharma") && (
        <TouchableOpacity
          style={styles.suggestion}
          onPress={() => handleLocationSelect(pharmacyLocation)}
        >
          <Text style={styles.suggestionText}>Pharmacy Office</Text>
        </TouchableOpacity>
      )}
      {searchText.toLowerCase().includes("book center") && (
        <TouchableOpacity
          style={styles.suggestion}
          onPress={() => handleLocationSelect(bookCenterLocation)}
        >
          <Text style={styles.suggestionText}>Book Center Office</Text>
        </TouchableOpacity>
      )}
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsUserLocation
        followsUserLocation
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Your Location"
            pinColor="blue" // This will make the marker blue
          />
        )}
        <Marker coordinate={pharmacyLocation} title={pharmacyLocation.name} />
        <Marker coordinate={bookCenterLocation} title={bookCenterLocation.name} />
        {routeCoordinates.length > 0 && (
          <Polyline coordinates={routeCoordinates} strokeColor="#0000FF" strokeWidth={6} />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  suggestion: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 10,
    marginBottom: 5,
  },
  suggestionText: {
    fontSize: 18,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MyMap;
