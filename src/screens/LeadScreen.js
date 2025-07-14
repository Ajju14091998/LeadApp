import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const statusColors = {
  'Follow Up': '#D3F5FF',
  'Meeting Pending': '#FFF3C7',
  'Meeting Schedule': '#D9C6F7',
  'Leads Win': '#CFF9CF',
  'Leads Lost': '#FFD4D4',
  'Convert to Client': '#C6F3D3',
};

const leadsData = [
  {
    id: '1',
    name: 'Barbara Moore',
    phone: '+91 9876543210',
    status: 'Follow Up',
    date: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '2',
    name: 'Pricilla Maureen',
    phone: '+91 9876543210',
    status: 'Meeting Pending',
    date: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '3',
    name: 'Robert George',
    phone: '+91 9876543210',
    status: 'Leads Win',
    date: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '4',
    name: 'Robert George',
    phone: '+91 9876543210',
    status: 'Meeting Schedule',
    date: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '5',
    name: 'Robert George',
    phone: '+91 9876543210',
    status: 'Convert to Client',
    date: '02 Feb 2025 - 12:00 PM',
  },
  {
    id: '6',
    name: 'Robert George',
    phone: '+91 9876543210',
    status: 'Leads Lost',
    date: '02 Feb 2025 - 12:00 PM',
  },
];

const LeadScreen = () => {
  const navigation = useNavigation();
  const [visibleMenuId, setVisibleMenuId] = useState(null);

  const toggleDropdown = id => {
    setVisibleMenuId(prev => (prev === id ? null : id));
  };

  const renderDropdownMenu = id => {
    if (visibleMenuId !== id) return null;

    return (
      <View style={styles.dropdownWrapper}>
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name="edit-3" size={16} color="#212121" />
            <Text style={styles.dropdownText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => navigation.navigate('AddFollowUp')}
          >
            <Icon name="plus" size={16} color="#212121" />
            <Text style={styles.dropdownText}>Add Follow</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name="trash-2" size={16} color="#212121" />
            <Text style={styles.dropdownText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderLeadItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('LeadDetails')}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleDropdown(item.id)}>
            <Icon name="more-vertical" size={20} color="#A9A9A9" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardFooter}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColors[item.status] || '#eee' },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </TouchableOpacity>

      {/* Dropdown shown outside card */}
      {renderDropdownMenu(item.id)}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => setVisibleMenuId(null)}>
      <View style={styles.container}>
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
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Leads Title */}
        <Text style={styles.screenTitle}>Leads</Text>

        {/* Leads List */}
        <FlatList
          data={leadsData}
          renderItem={renderLeadItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LeadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    lineHeight: 21.6,
    fontFamily: 'Urbanist-Bold',
    marginTop: 30,
    marginBottom: 20,
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Urbanist-Bold',
  },
  phone: {
    fontSize: 14,
    color: '#424242',
    marginTop: 4,
    marginBottom: 5,
    fontFamily: 'Urbanist-Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Urbanist-Bold',
    color: '#212121',
  },
  date: {
    fontSize: 14,
    color: '#9E9E9E',
    fontFamily: 'Urbanist-Regular',
  },
  dropdownWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    minWidth: 130,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  dropdownText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Urbanist-Regular',
    color: '#212121',
  },
});
