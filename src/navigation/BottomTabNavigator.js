// src/navigation/BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "../navigation/HomeStack";
import ClientScreen from "../screens/ClientScreen";
import TaskScreen from "../screens/TaskScreen";
import LeadStack from "../navigation/LeadStack";
import ClientStack from "../navigation/ClientStack";
import HomeIcon from "../assets/icons/Home";
import FileText from "../assets/icons/Lead";
import Client from "../assets/icons/Client";
import Task from "../assets/icons/Task";
import CustomTabBarButton from "../components/CustomeTabbutton";
import TaskStack from "../navigation/TaskStack";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2B2162",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarLabelStyle: {
          fontFamily: "Urbanist",
          fontSize: 10,
          fontWeight: "700",
          textAlign: "center",
          letterSpacing: 0.2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width={24}
              height={24}
              color={focused ? "#2B2162" : "#8E8E93"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Lead"
        component={LeadStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <FileText
              width={24}
              height={24}
              color={focused ? "#2B2162" : "#8E8E93"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={() => null} // No component needed because modal handles content
        options={{
          tabBarLabel: "",
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          ),
        }}
      />

      <Tab.Screen
        name="Client"
        component={ClientStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Client
              width={24}
              height={24}
              color={focused ? "#2B2162" : "#8E8E93"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Task"
        component={TaskStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Task
              width={24}
              height={24}
              color={focused ? "#2B2162" : "#8E8E93"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
