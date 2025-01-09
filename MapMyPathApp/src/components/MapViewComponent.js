import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const MapViewComponent = ({ initialRegion, routes }) => {
  const renderPolyline = (route, color) => {
    if (!route || !route.routes || !route.routes.length) return null;
    const coordinates = route.routes[0].geometry.coordinates.map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));
    return <Polyline coordinates={coordinates} strokeWidth={3} strokeColor={color} />;
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      {routes.length > 0 && (
        <>
          {renderPolyline(routes[0], 'blue')}
          {renderPolyline(routes[1], 'green')}
        </>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    marginVertical: 10,
  },
});

export default MapViewComponent;
