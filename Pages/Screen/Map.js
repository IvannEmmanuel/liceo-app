import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";

// GoMaps API Key
const apiKey = "AlzaSyJ-7bx94F4YsL44lzOqdUXgClf2ach4mRo";

const LocationMap = () => {
  const [region, setRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState(null); // Added state for distance

  // Coordinates for the Pharmacy Office (Liceo de Cagayan University)
  const pharmacyLocation = {
    latitude: 8.485858,
    longitude: 124.639341,
  };

  // Coordinates for Next Moves Dance Company
  const danceCompanyLocation = {
    latitude: 8.485452,
    longitude: 124.639237,
  };

  // Coordinates for Kabina
  const kabinaLocation = {
    latitude: 8.504217,
    longitude: 124.644259,
  };

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getLocationPermission();

    if (hasPermission) {
      const getLocation = async () => {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setRegion({
          latitude: 8.485858,
          longitude: 124.639341,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      };

      getLocation();
    }
  }, [hasPermission]);

  // Handle map region change but don't update the current location marker
  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  // Function to fetch directions and update the route (for road-following)
  const fetchDirections = async (origin, destination) => {
    const originString = `${origin.latitude},${origin.longitude}`;
    const destinationString = `${destination.latitude},${destination.longitude}`;

    const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${originString}&destination=${destinationString}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length > 0) {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  // Function to decode polyline into coordinates
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let byte,
        shift = 0,
        result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  // Haversine formula to calculate the straight-line distance between two coordinates
  const calculateDistance = (origin, destination) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km

    const lat1 = toRad(origin.latitude);
    const lon1 = toRad(origin.longitude);
    const lat2 = toRad(destination.latitude);
    const lon2 = toRad(destination.longitude);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = R * c; // Distance in km
    console.log(`Distance in Km: ${distanceInKm}`);
    const distanceInMeters = distanceInKm * 1000; // Convert km to meters
    console.log(`Distance in Meters: ${distanceInMeters}`);
    return distanceInMeters;
  };

  // Handle search and update destination
  const handleSearch = () => {
    let location;
    if (searchQuery.toLowerCase() === "pharmacy office") {
      location = pharmacyLocation;
    } else if (searchQuery.toLowerCase() === "next moves dance company") {
      location = danceCompanyLocation;
    } else if (searchQuery.toLowerCase() === "kabina") {
      location = kabinaLocation;
    }

    console.log("Selected Location:", location);

    if (location && currentLocation) {
      setDestination(location);
      fetchDirections(currentLocation, location);
      const calculatedDistance = calculateDistance(currentLocation, location);
      setDistance(calculatedDistance);
      console.log("Calculated Distance:", calculatedDistance);
    } else {
      setDestination(null);
      setRouteCoordinates([]);
      setDistance(null);
    }
  };

  if (!hasPermission) {
    return (
      <View>
        <Text>No permission to access location</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Search for a location"
          style={styles.inputLoc}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Search for a location"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} /> */}
      </View>

      {region && currentLocation && (
        <MapView
          style={styles.map}
          region={region}
          //onRegionChangeComplete={onRegionChangeComplete}
          mapType="hybrid"
        >
          {/* Marker for the current location */}
          <Marker coordinate={currentLocation} title="Your Location" />

          {/* Marker for the destination */}
          {destination && (
            <>
              <Marker coordinate={destination} title={searchQuery} />
              {/* Polyline between current location and destination */}
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="purple" // Red color for the polyline
                strokeWidth={4} // Line thickness
              />
            </>
          )}
        </MapView>
      )}

      {/* Display the calculated distance */}
      {distance !== null && (
        <View style={styles.distanceContainer}>
          <Text>
            Distance:{" "}
            {distance < 1000
              ? `${distance.toFixed(0)} meters` // If the distance is less than 1 km, display in meters
              : `${(distance / 1000).toFixed(2)} km`}{" "}
            {/* If it's 1 km or more, display in kilometers */}
          </Text>
        </View>
      )}
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
  searchBar: {
    padding: 10,
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputLoc: {
    paddingHorizontal: 10,
  },
  distanceContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
});

export default LocationMap;
