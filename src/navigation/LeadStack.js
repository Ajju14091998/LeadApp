  import React from 'react';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import LeadDetailScreen from '../screens/LeadDetailScreen';
  import LeadScreen from '../screens/LeadScreen';
  import ProfileScreen from '../screens/ProfileScreen';
  import AddFollowUpScreen from '../screens/AddFollowUpScreen';
  import AddServicesScreen from '../screens/AddServicesScreen';
  import AddLeadScreen from '../screens/AddLeadScreen';

  const Stack = createNativeStackNavigator();

  export default function LeadStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LeadMain" component={LeadScreen} />
        <Stack.Screen name="LeadDetails" component={LeadDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddFollowUp" component={AddFollowUpScreen} />
        <Stack.Screen name="AddServices" component={AddServicesScreen} />
        <Stack.Screen name="LeadAdd" component={AddLeadScreen} />
      </Stack.Navigator>
    );
  }
