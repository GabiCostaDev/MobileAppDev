import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RoutePlanner from '../components/RoutePlanner';
import ActivityTracker from '../components/ActivityTracker';
import PerformanceAnalyzer from '../components/PerformanceAnalyzer';
import PerformanceHistory from '../components/PerformanceHistory';

const Tab = createBottomTabNavigator();

const FitnessApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RoutePlanner" component={RoutePlanner} />
      <Tab.Screen name="ActivityTracker" component={ActivityTracker} />
      <Tab.Screen name="PerformanceAnalyzer" component={PerformanceAnalyzer} />
      <Tab.Screen name="PerformanceHistory" component={PerformanceHistory} />
    </Tab.Navigator>
  );
};

export default FitnessApp;
