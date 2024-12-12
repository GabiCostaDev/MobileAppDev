import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const RouteResults = ({ routes = [] }) => {
  const formatDistance = (meters) => {
    const miles = meters / 1609.34;
    return `${miles.toFixed(2)} miles`;
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <ScrollView style={styles.resultsContainer}>
      {routes.length > 0 ? (
        <>
          {routes[0] && (
            <View>
              <Text>Quickest Route:</Text>
              <Text>Distance: {formatDistance(routes[0].distance)}</Text>
              <Text>Estimated Time: {formatTime(routes[0].duration)}</Text>
            </View>
          )}
          {routes[1] && (
            <View>
              <Text>Scenic Route:</Text>
              <Text>Distance: {formatDistance(routes[1].distance)}</Text>
              <Text>Estimated Time: {formatTime(routes[1].duration)}</Text>
            </View>
          )}
        </>
      ) : (
        <Text>No routes available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    marginTop: 10,
  },
});

export default RouteResults;
