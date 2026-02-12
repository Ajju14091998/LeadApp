import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeadDetailScreen from '../screens/LeadDetailScreen';
import LeadScreen from '../screens/LeadScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddLeadScreen from '../screens/AddLeadScreen';
import LeadFollowUp from '../screens/LeadFollowUpScreen';
import LeadAddServices from '../screens/LeadAddServices';

const Stack = createNativeStackNavigator();

export default function LeadStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LeadMain" component={LeadScreen} />
      <Stack.Screen name="LeadDetails" component={LeadDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="LeadFollowUp" component={LeadFollowUp} />
      <Stack.Screen name="LeadAddServices" component={LeadAddServices} />
      <Stack.Screen name="LeadAdd" component={AddLeadScreen} />
    </Stack.Navigator>
  );
}
