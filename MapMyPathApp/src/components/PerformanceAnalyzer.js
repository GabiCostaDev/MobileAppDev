import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

const PerformanceAnalyzer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { route: initialRoute, matchedRoute, routeCoordinates } = route.params || {};
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [screenshot, setScreenshot] = useState(null);
  const [workoutNumber, setWorkoutNumber] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    if (matchedRoute) {
      const totalDistance = matchedRoute.matchings.reduce((acc, matching) => acc + matching.distance, 0);
      const totalDuration = matchedRoute.matchings.reduce((acc, matching) => acc + matching.duration, 0);
      setDistance(totalDistance);
      setDuration(totalDuration);
    }
  }, [matchedRoute]);

  useEffect(() => {
    const loadWorkoutNumber = async () => {
      const number = await AsyncStorage.getItem('workoutNumber');
      setWorkoutNumber(number ? parseInt(number) + 1 : 1);
    };
    loadWorkoutNumber();
  }, []);

  useEffect(() => {
    if (distance && duration) {
      logWorkout();
    }
  }, [distance, duration]);

  const logWorkout = async () => {
    const workout = {
      id: Date.now(),
      number: workoutNumber,
      date: new Date().toLocaleDateString(),
      distance: (distance / 1609.34).toFixed(2),
      time: `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`,
      route: routeCoordinates,
    };

    try {
      const history = JSON.parse(await AsyncStorage.getItem('workoutHistory')) || [];
      history.push(workout);
      await AsyncStorage.setItem('workoutHistory', JSON.stringify(history));
      await AsyncStorage.setItem('workoutNumber', workoutNumber.toString());
      console.log('Workout logged:', workout);
    } catch (error) {
      console.error('Error logging workout:', error);
    }

    navigation.navigate('PerformanceHistory');
  };

  const renderPolyline = (data, color) => {
    if (!data || !data.matchings || !data.matchings.length) return null;
    const coordinates = data.matchings[0].geometry.coordinates.map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));

    return <Polyline coordinates={coordinates} strokeWidth={3} strokeColor={color} />;
  };

  const takeScreenshot = async () => {
    try {
      const uri = await captureRef(mapRef, {
        format: 'png',
        quality: 0.8,
      });
      setScreenshot(uri);
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  };

  const shareScreenshot = async () => {
    if (!screenshot) return;

    try {
      await Sharing.shareAsync(screenshot);
    } catch (error) {
      console.error('Error sharing screenshot:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Performance Analyzer</Text>
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
      <View style={styles.performanceInfo}>
        <Text>Distance: {(distance / 1609.34).toFixed(2)} miles</Text>
        <Text>Time: {Math.floor(duration / 3600)}h {Math.floor((duration % 3600) / 60)}m</Text>
        <Button title="Take Screenshot" onPress={takeScreenshot} />
        {screenshot && <Button title="Share Screenshot" onPress={shareScreenshot} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    marginVertical: 20,
  },
  performanceInfo: {
    alignItems: 'center',
  },
});

export default PerformanceAnalyzer;
