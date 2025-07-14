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

const meetingData = [
  {
    id: '1',
    name: 'Barbara Moore',
    phone: '+91 9876543210',
    datetime: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '2',
    name: 'Barbara Moore',
    phone: '+91 9876543210',
    datetime: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '3',
    name: 'Barbara Moore',
    phone: '+91 9876543210',
    datetime: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '4',
    name: 'Barbara Moore',
    phone: '+91 9876543210',
    datetime: '02 Feb 2025 - 12:00 PM',
  },
];

const AllMeetingsScreen = () => {
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
        <Text style={styles.headerTitle}>Upcoming Meetings</Text>
        <View style={{ width: 24 }} /> {/* Placeholder to balance back icon */}
      </View>

      {meetingData.map(item => (
        <View key={item.id} style={styles.meetingCard}>
          <View>
            <Text style={styles.meetingName}>{item.name}</Text>
            <Text style={styles.meetingPhone}>{item.phone}</Text>
            <Text style={styles.meetingTime}>{item.datetime}</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#999" />
        </View>
      ))}
    </ScrollView>
  );
};

export default AllMeetingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Urbanist-Bold',
    color: '#212121',
    lineheight: 120,
  },
  meetingCard: {
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
  meetingName: {
    fontSize: 16,
    lineheight: 24,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  meetingPhone: {
    fontSize: 14,
    lineheight: 20,
    fontFamily: 'Urbanist-Regular',
    fontWeight: '400',
    color: '#424242',
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  meetingTime: {
    fontSize: 14,
    lineheight: 20,
    fontFamily: 'Urbanist-Regular',
    fontWeight: '400',
    color: '#424242',
    letterSpacing: 0.2,
  },
});
