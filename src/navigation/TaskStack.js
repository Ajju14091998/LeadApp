import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from '../screens/TaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddTask from '../screens/AddTask';

const Stack = createNativeStackNavigator();

export default function TaskStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskMain" component={TaskScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
       <Stack.Screen name="AddTask" component={AddTask} />
    </Stack.Navigator>
  );
}
