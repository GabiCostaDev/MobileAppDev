import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, { Polyline } from 'react-native-maps';
import SearchInput from './SearchInput';
import { getCoordinates, directionsApi } from '../api/mapboxApi';

const RoutePlanner = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [quickestRoute, setQuickestRoute] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setLocation({ latitude, longitude });
    })();
  }, []);

  const planRoute = async () => {
    try {
      const startCoordinates = await getCoordinates(start);
      if (!startCoordinates) throw new Error('Failed to get start coordinates');

      const endCoordinates = await getCoordinates(end);
      if (!endCoordinates) throw new Error('Failed to get end coordinates');

      const coordinates = `${startCoordinates};${endCoordinates}`;

      const quickResponse = await directionsApi('walking', coordinates, { exclude: 'ferry', overview: 'simplified', steps: true });
      if (!quickResponse.data || !quickResponse.data.routes || quickResponse.data.routes.length === 0 || !quickResponse.data.routes[0].geometry) {
        throw new Error('Invalid response for quickest route');
      }

      setQuickestRoute(quickResponse.data.routes[0]);
    } catch (error) {
      console.error('Error planning route:', error);
      setQuickestRoute(null); // Ensure route is reset on error
    }
  };

  const startWorkout = () => {
    navigation.navigate('ActivityTracker', {
      route: quickestRoute,
      startTime: Date.now(),
    });
  };

  const renderPolyline = (route) => {
    if (!route || !route.geometry) return null;
    const coordinates = route.geometry.coordinates.map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));

    return <Polyline coordinates={coordinates} strokeWidth={3} strokeColor="blue" />;
  };

  const renderSteps = (route) => {
    if (!route || !route.legs || !route.legs[0].steps) return null;
    return route.legs[0].steps.map((step, index) => (
      <Text key={index} style={styles.stepText}>
        {step.maneuver.instruction}
      </Text>
    ));
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <SearchInput
        placeholder="Starting Point"
        value={start}
        onChangeText={setStart}
        location={location}
      />
      <SearchInput
        placeholder="Destination"
        value={end}
        onChangeText={setEnd}
        location={location}
      />
      <Button title="Plan Route" onPress={planRoute} />
      {initialRegion && quickestRoute && (
        <>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
          >
            {renderPolyline(quickestRoute)}
          </MapView>
          <View style={styles.routeInfo}>
            <Text>Distance: {((quickestRoute.distance / 1609.34).toFixed(2))} miles</Text>
            <Text>Estimated Time: {(Math.floor(quickestRoute.duration / 3600))}h {(Math.floor((quickestRoute.duration % 3600) / 60))}m</Text>
            <Button title="Start" onPress={startWorkout} />
          </View>
          <View style={styles.stepsContainer}>
            <Text>Directions:</Text>
            {renderSteps(quickestRoute)}
          </View>
        </>
      )}
      {!quickestRoute && <Text style={styles.errorText}>No routes available. Please try again.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    marginVertical: 20,
  },
  routeInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  stepsContainer: {
    marginTop: 20,
  },
  stepText: {
    paddingVertical: 5,
  },
  errorText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'red',
  },
});

export default RoutePlanner;
