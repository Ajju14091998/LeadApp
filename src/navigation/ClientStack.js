import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import ClientListScreen from '../screens/ClientScreen';
import ClientDetailScreen from '../screens/ClientDetailScreen';
import ClientFollowUp from '../screens/ClientFollowup';
import ClientAddServices from '../screens/ClientAddServices';

const Stack = createNativeStackNavigator();

export default function LeadStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClientMain" component={ClientListScreen} />
      <Stack.Screen name="ClientDetails" component={ClientDetailScreen} />
      <Stack.Screen name="ClientFollowup" component={ClientFollowUp} />
      <Stack.Screen name="ClientAddServices" component={ClientAddServices} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
