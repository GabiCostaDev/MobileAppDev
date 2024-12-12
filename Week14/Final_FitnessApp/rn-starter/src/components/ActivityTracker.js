import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import { mapMatchingApi } from '../api/mapboxApi';

const ActivityTracker = () => {
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [matchedRoute, setMatchedRoute] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { route: initialRoute, startTime } = route.params || {};

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 1 },
        (newLocation) => {
          const newCoords = { longitude: newLocation.coords.longitude, latitude: newLocation.coords.latitude };
          setLocation(newLocation.coords);
          setRouteCoordinates(prevCoords => {
            const updatedCoords = [...prevCoords, newCoords];
            if (updatedCoords.length > 100) {
              updatedCoords.splice(0, updatedCoords.length - 100); // Keep only the last 100 coordinates
            }
            if (updatedCoords.length >= 2) {  // Ensure we have at least 2 coordinates before calling the API
              matchRoute(updatedCoords);
            }
            return updatedCoords;
          });
        }
      );

      // Start the timer
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);

      return () => clearInterval(intervalRef.current);  // Cleanup on unmount
    })();
  }, []);

  const matchRoute = async (coords) => {
    if (coords.length < 2) {
      console.error('Not enough coordinates for map matching');
      return;
    }

    const coordinatesString = coords.map(coord => `${coord.longitude},${coord.latitude}`).join(';');
    console.log('Matching coordinates:', coordinatesString);
    console.log('Number of coordinates:', coords.length);

    try {
      const response = await mapMatchingApi('walking', coordinatesString);
      if (!response.data.matchings || response.data.matchings.length === 0) {
        console.error('Invalid response for map matching:', response.data);
        throw new Error('Invalid response for map matching');
      }
      setMatchedRoute(response.data);
    } catch (error) {
      console.error('Error matching route:', error.response ? error.response.data : error.message);
    }
  };

  const renderPolyline = (data, color) => {
    if (!data || !data.matchings || !data.matchings.length) return null;
    const coordinates = data.matchings[0].geometry.coordinates.map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));

    return <Polyline coordinates={coordinates} strokeWidth={3} strokeColor={color} />;
  };

  const stopWorkout = () => {
    clearInterval(intervalRef.current);  // Stop the timer
    navigation.navigate('PerformanceAnalyzer', {
      route: initialRoute,
      matchedRoute,
      routeCoordinates,
      duration: elapsedTime / 1000, // Convert to seconds
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Track Your Activity</Text>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: initialRoute.geometry.coordinates[0][1],
          longitude: initialRoute.geometry.coordinates[0][0],
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {renderPolyline(initialRoute, 'blue')}
        {renderPolyline(matchedRoute, 'green')}
      </MapView>
      <View style={styles.timerContainer}>
        <Text>Elapsed Time: {Math.floor(elapsedTime / 1000)} seconds</Text>
      </View>
      <Button title="Stop Workout" onPress={stopWorkout} />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    marginVertical: 20,
  },
  timerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ActivityTracker;
