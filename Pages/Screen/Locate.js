//7bx94F4YsL44lzOqdUXgClf2ach4mRo


import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const Locate = ({ route }) => {
  const { latitude, longitude } = route.params || {}; // Destination latitude and longitude
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to decode a polyline string into coordinates
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

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
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required to use this feature.");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const currentLocation = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        setUserLocation(currentLocation);

        // Fetch route polyline from Google Maps Directions API
        const API_KEY = "AlzaSy-Yy3WwWuCy4umW2tT9bfaaBVO8Al1P-5m"; // Replace with a secure method to load the API key
        const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
        const destination = `${latitude},${longitude}`;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`;

        const response = await axios.get(url);
        const points = response.data.routes[0]?.overview_polyline?.points;

        if (points) {
          const decodedPolyline = decodePolyline(points);
          setRouteCoordinates(decodedPolyline);
        } else {
          Alert.alert("Route Error", "Could not fetch the route. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
        Alert.alert("Error", "Unable to fetch directions. Check your internet connection or API key.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserLocationAndRoute();
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      {latitude && longitude ? (
        userLocation ? (
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1E90FF" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : 
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
            <Marker
              coordinate={userLocation}
              title="Your Location"
              pinColor="#1E90FF"
            >
              <MaterialIcons name="person-pin-circle" size={30} color="#FFFFFF" />
            </Marker>

            <Marker
              coordinate={{ latitude, longitude }}
              title="Selected Location"
              pinColor="#32CD32"
            >
              <MaterialIcons name="place" size={30} color="#FFFFFF" />
            </Marker>

            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeWidth={8}
                strokeColor="#1E90FF"
                lineDashPattern={[5, 10]}
              />
            )}
          </MapView>
        ) : (
          <Text style={styles.errorText}>Unable to fetch your location. Please try again.</Text>
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
    backgroundColor: "#f5f5f5",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 99, 71, 0.1)",
    padding: 15,
    justifyContent: "center",
    borderRadius: 10,
    margin: 20,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  messageText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ff6347",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6347",
    textAlign: "center",
    margin: 20,
  },
});

export default Locate;
