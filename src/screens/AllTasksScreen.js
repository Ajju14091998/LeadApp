// src/screens/AllTasksScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const taskData = [
  {
    id: '1',
    name: 'Client Follow-up Call',
    phone: '+91 9823456780',
    datetime: '04 Feb 2025 - 11:00 AM',
  },
  {
    id: '2',
    name: 'UI Design Review',
    phone: '+91 9911223344',
    datetime: '04 Feb 2025 - 3:00 PM',
  },
  {
    id: '3',
    name: 'Marketing Strategy Meeting',
    phone: '+91 9001234567',
    datetime: '05 Feb 2025 - 10:30 AM',
  },
  {
    id: '4',
    name: 'Backend Deployment Check',
    phone: '+91 9834567890',
    datetime: '05 Feb 2025 - 1:00 PM',
  },
  {
    id: '5',
    name: 'Team Retrospective',
    phone: '+91 9876501234',
    datetime: '06 Feb 2025 - 5:00 PM',
  },
];

const AllTasksScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Tasks</Text>
        <View style={{ width: 24 }} /> {/* Balance placeholder */}
      </View>

      {/* Tasks List */}
      {taskData.map(item => (
        <View key={item.id} style={styles.taskCard}>
          <View>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskPhone}>{item.phone}</Text>
            <Text style={styles.taskTime}>{item.datetime}</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#999" />
        </View>
      ))}
    </ScrollView>
  );
};

export default AllTasksScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Urbanist-Bold',
    color: '#212121',
    lineheight: 120,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  taskName: {
    fontSize: 16,
    lineheight: 24,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  taskPhone: {
    fontSize: 14,
    lineheight: 20,
    fontFamily: 'Urbanist-Regular',
    fontWeight: '400',
    color: '#424242',
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  taskTime: {
    fontSize: 14,
    lineheight: 20,
    fontFamily: 'Urbanist-Regular',
    fontWeight: '400',
    color: '#424242',
    letterSpacing: 0.2,
  },
});
