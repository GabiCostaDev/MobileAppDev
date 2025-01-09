import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerformanceHistory = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    const loadWorkoutHistory = async () => {
      try {
        const history = JSON.parse(await AsyncStorage.getItem('workoutHistory')) || [];
        setWorkoutHistory(history);
        console.log('Workout history loaded:', history);
      } catch (error) {
        console.error('Error loading workout history:', error);
      }
    };
    loadWorkoutHistory();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={workoutHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>Workout #{item.number}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Distance: {item.distance} miles</Text>
            <Text>Time: {item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    padding: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default PerformanceHistory;
