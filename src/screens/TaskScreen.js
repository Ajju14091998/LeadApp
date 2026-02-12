import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const TaskScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Lead Task');
  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const statusOptions = [
    'Task Complete',
    'Waiting for Documents',
    'Under Process',
    'Reject',
    'Mandate Pending',
    'Informed Client',
  ];

  const leadTasks = [
    {
      id: '1',
      title: 'Add Account',
      name: 'John Smith',
      status: 'Mandate Approved',
      date: '02 Feb 2025 - 12:00 PM',
    },
  ];

  const clientTasks = [
    {
      id: '2',
      title: 'Renew Mandate',
      name: 'Emily Brown',
      status: 'Mandate Approved',
      date: '03 Feb 2025 - 11:00 AM',
    },
  ];

  const tasks = selectedTab === 'Lead Task' ? leadTasks : clientTasks;

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
            onPress={() => {
              setStatusModalVisible(true);
              setVisibleMenuId(null);
            }}
          >
            <Icon name="check-circle" size={16} color="#212121" />
            <Text style={styles.dropdownText}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name="trash-2" size={16} color="#212121" />
            <Text style={styles.dropdownText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('TaskDetails', { item })}
      >
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardName}>{item.name}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleDropdown(item.id)}>
            <Icon name="more-vertical" size={20} color="#A9A9A9" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </TouchableOpacity>
      {renderDropdownMenu(item.id)}
    </View>
  );

  return (
    <>
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

          {/* Search */}
          <View style={styles.searchBar}>
            <Icon
              name="search"
              size={18}
              color="#A9A9A9"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {['Lead Task', 'Client Task'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={styles.tabButton}
                onPress={() => setSelectedTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
                {selectedTab === tab && <View style={styles.tabUnderline} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* List */}
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Status Modal */}
      <Modal
        isVisible={statusModalVisible}
        onBackdropPress={() => setStatusModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Status</Text>
          <ScrollView style={{ maxHeight: 300 }}>
            {statusOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.radioOption}
                onPress={() => setSelectedStatus(option)}
              >
                <Text style={styles.radioText}>{option}</Text>
                <View
                  style={[
                    styles.radioOuter,
                    selectedStatus === option && { borderColor: '#2B2162' },
                  ]}
                >
                  {selectedStatus === option && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => setStatusModalVisible(false)}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default TaskScreen;

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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 44,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
    color: '#000',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    color: '#2B2162',
    fontFamily: 'Urbanist-SemiBold',
    lineHeight: 25,
    letterSpacing: 0.2,
    textAlign: 'center',
  },

  tabTextActive: {
    color: '#2B2162',
    fontFamily: 'Urbanist-Bold',
  },
  tabUnderline: {
    marginTop: 4,
    height: 2,
    backgroundColor: '#2B2162',
    width: '100%',
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Urbanist-Bold',
    lineHeight: 24,
  },

  cardName: {
    fontSize: 14,
    color: '#424242',
    fontFamily: 'Urbanist-Regular',
    lineHeight: 20,
    letterSpacing: 0.2,
    marginTop: 4,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: '#2B2162',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Urbanist-Bold',
  },
  date: {
    fontSize: 12,
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
    lineHeight: 28.8,
    marginBottom: 20,
  },

  radioOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Urbanist-Bold',
    lineHeight: 21.6,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2B2162',
  },
  submitButton: {
    backgroundColor: '#2B2162',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontFamily: 'Urbanist-Bold',
    fontSize: 15,
  },
});
