import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';


const summaryData = [
  { title: 'Total Leads', count: 1642 },
  { title: 'Total Clients', count: 3642 },
  { title: 'Total Tasks', count: 5467 },
  { title: 'Total Pending', count: 5453 },
];

const meetingData = [
  {
    id: '1',
    name: 'Barbara Moore',
    phone: '+91 9876543210',
    datetime: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '2',
    name: 'Karlene Chaidez',
    phone: '+91 9876543210',
    datetime: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '3',
    name: 'Russell Copeland',
    phone: '+91 9876543210',
    datetime: '02 Feb 2025 - 12:00 PM',
  },
];

const taskData = [
  {
    id: '1',
    name: 'Follow-up with Client',
    phone: '+91 9876543210',
    datetime: '03 Feb 2025 - 10:00 AM',
  },
  {
    id: '2',
    name: 'Design Review Meeting',
    phone: '+91 9876543210',
    datetime: '03 Feb 2025 - 2:00 PM',
  },
  {
    id: '3',
    name: 'Design Review Meeting',
    phone: '+91 9876543210',
    datetime: '03 Feb 2025 - 2:00 PM',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerRight}>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Icon name="bell" size={22} color="#2B2162" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardScroll}
      >
        {summaryData.map((item, index) => (
          <View key={index} style={styles.summaryCard}>
            <Text style={styles.cardCount}>
              {item.count.toLocaleString('en-US')}
            </Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Upcoming Meetings */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllMeetings')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
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

      {/* Upcoming Tasks */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllTasks')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {taskData.map(item => (
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

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  cardScroll: {
    paddingVertical: 8,
  },
  summaryCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    gap: 3,
  },
  cardCount: {
    fontSize: 20,
    lineHeight: 29,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    color: '#424242',
    letterSpacing: 0.2,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    color: '#212121',
  },
  seeAllText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    color: '#246BFD',
    letterSpacing: 0.2,
    textAlign: 'right',
  },
  meetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 28,
    gap: 12,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#EEE',
    shadowColor: 'rgba(4, 6, 15, 0.05)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 4,
    marginBottom: 12,
  },
  meetingName: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  meetingPhone: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Urbanist-Regular',
    fontWeight: '400',
    color: '#424242',
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  meetingTime: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Urbanist-Regular',
    fontWeight: '400',
    color: '#424242',
    letterSpacing: 0.2,
  },
});
