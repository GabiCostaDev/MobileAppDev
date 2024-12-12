import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import FitnessApp from './src/screens/FitnessApp';
import RoutePlanner from './src/components/RoutePlanner';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FitnessApp" component={FitnessApp} />
        <Stack.Screen name="RoutePlanner" component={RoutePlanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
