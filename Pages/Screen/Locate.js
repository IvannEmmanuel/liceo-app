import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons"; // Importing an icon set for simplicity

const Locate = ({ route }) => {
  const { latitude, longitude, name } = route.params || {}; // Destination latitude and longitude
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]); // Stores the decoded polyline coordinates

  // Function to decode a polyline string into coordinates
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchUserLocationAndRoute = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const currentLocation = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        setUserLocation(currentLocation);

        // Fetch route polyline from Google Maps Directions API
        const API_KEY = "AlzaSyJ-7bx94F4YsL44lzOqdUXgClf2ach4mRo"; // Replace with your API key
        const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
        const destination = `${latitude},${longitude}`;
        const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`;

        try {
          const response = await axios.get(url);
          const points = response.data.routes[0].overview_polyline.points;
          const decodedPolyline = decodePolyline(points);
          setRouteCoordinates(decodedPolyline);
        } catch (error) {
          console.error("Error fetching directions:", error);
        }
      } else {
        console.error("Location permission denied.");
      }
    };

    fetchUserLocationAndRoute();
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      {latitude && longitude ? (
        userLocation ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            mapType="hybrid"
          >
            {/* User Location Marker with custom style */}
            <Marker
              coordinate={userLocation}
              title="Your Location"
              pinColor="#1E90FF" // Custom color for user marker (DodgerBlue)
            >
              <MaterialIcons name="person-pin-circle" size={30} color="#FFFFFF" />
            </Marker>

            {/* Destination Marker with custom style */}
            <Marker
              coordinate={{ latitude, longitude }}
              title={name}
              pinColor="#32CD32" // Custom color for destination marker (LimeGreen)
            >
              <MaterialIcons name="place" size={30} color="#FFFFFF" />
            </Marker>

            {/* Route Polyline (Dotted Line) */}
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeWidth={4}
                strokeColor="#1E90FF" // Custom color for the polyline (DodgerBlue)
                lineDashPattern={[5, 5]} // Adding dashed pattern for the polyline
              />
            )}
          </MapView>
        ) : (
          <Text style={styles.loadingText}>Loading your location...</Text>
        )
      ) : (
        <View style={styles.messageContainer}>
          <MaterialIcons name="location-pin" size={24} color="#ff6347" style={styles.icon} />
          <Text style={styles.messageText}>Please select a destination first</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5", // Light background for the container
  },
  map: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 99, 71, 0.1)", // Light background for visibility
    padding: 15,
    justifyContent: "center",
    borderRadius: 10,
    margin: 20,
    elevation: 5, // Light shadow effect
  },
  icon: {
    marginRight: 10,
  },
  messageText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ff6347", // Vibrant text color
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Text color for loading
    textAlign: "center",
    marginTop: 20,
  },
});

export default Locate;