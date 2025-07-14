import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AllMeetingsScreen from '../screens/AllMeetingsScreen';
import AllTasksScreen from '../screens/AllTasksScreen';
import ProfileScreen from '../screens/ProfileScreen'; 

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="AllMeetings" component={AllMeetingsScreen} />
      <Stack.Screen name="AllTasks" component={AllTasksScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} /> 
    </Stack.Navigator>
  );
}
