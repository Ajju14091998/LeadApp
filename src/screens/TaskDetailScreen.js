import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';

const TaskDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const [menuVisible, setMenuVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const statusOptions = [
    'Task Complete',
    'Waiting for Documents',
    'Under Process',
    'Reject',
    'Mandate Pending',
    'Informed Client',
  ];

  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('TaskMain')}>
            <Icon name="arrow-left" size={22} color="#212121" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{item.title}</Text>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Icon name="more-vertical" size={22} color="#212121" />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {menuVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                // Handle edit here if needed
              }}
            >
              <Icon name="edit-3" size={16} color="#212121" />
              <Text style={styles.dropdownText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                setStatusModalVisible(true);
              }}
            >
              <Icon name="check-circle" size={16} color="#212121" />
              <Text style={styles.dropdownText}>Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => setMenuVisible(false)}
            >
              <Icon name="trash-2" size={16} color="#212121" />
              <Text style={styles.dropdownText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {[
            { icon: 'clipboard', label: 'Task Name', value: item.title },
            { icon: 'user', label: 'Task Owner', value: item.name },
            { icon: 'flag', label: 'Priority', value: 'Medium' },
            { icon: 'trending-up', label: 'Progress', value: '50%' },
            {
              icon: 'info',
              label: 'Lead Status',
              value: (
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Under Process</Text>
                </View>
              ),
            },
            { icon: 'calendar', label: 'Due Date', value: 'Feb 14, 2025' },
            {
              icon: 'file-text',
              label: 'Service Request',
              value:
                'Account close once redemption amt credited to his account.',
            },
            { icon: 'calendar', label: 'Start Date', value: 'Feb 21, 2025' },
            { icon: 'bell', label: 'Reminder Date', value: 'Feb 15, 2025' },
            {
              icon: 'message-square',
              label: 'Remarks',
              value: 'Query raised- 11310957',
            },
          ].map((row, index) => (
            <View style={styles.row} key={index}>
              <View style={styles.rowLeft}>
                <Icon name={row.icon} size={18} color="#212121" />
                <Text style={styles.label}>{row.label}</Text>
              </View>
              <View style={styles.rowRight}>
                {typeof row.value === 'string' ? (
                  <Text style={styles.value}>{row.value}</Text>
                ) : (
                  row.value
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Status Bottom Modal */}
        <Modal
          isVisible={statusModalVisible}
          onBackdropPress={() => setStatusModalVisible(false)}
          style={styles.bottomModal}
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TaskDetailsScreen;

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
    fontFamily: 'Urbanist-Bold',
    color: '#212121',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    zIndex: 999,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  rowRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    color: '#424242',
    fontFamily: 'Urbanist-Regular',
    marginLeft: 8,
    flexShrink: 1,
  },
  value: {
    fontSize: 16,
    color: '#212121',
    fontFamily: 'Urbanist-Bold',
    textAlign: 'right',
  },
  statusBadge: {
    borderWidth: 1,
    borderColor: '#2B2162',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#2B2162',
    fontFamily: 'Urbanist-SemiBold',
  },
  bottomModal: {
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
