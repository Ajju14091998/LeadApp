import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function CustomTabBarButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {/* Floating Button */}
      <TouchableOpacity
        onPress={toggleModal}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Icon name={modalVisible ? 'x' : 'plus'} color="#fff" size={28} />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.popoverContainer}>
                {/* Triangle Pointer */}
                <View style={styles.triangle} />

                {/* Popover Box */}
                <View style={styles.popoverContent}>
                  {/* Lead Option */}
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      toggleModal();
                      navigation.navigate('Lead', {
                        screen: 'LeadAdd',
                      });
                    }}
                  >
                    <Text style={styles.optionText}>Lead</Text>
                    <Icon name="filter" size={20} color="#2B2162" />
                  </TouchableOpacity>

                  {/* Divider */}
                  <View style={styles.divider} />

                  {/* Task Option */}
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      toggleModal();
                      navigation.navigate('Task', { screen: 'AddTask' }); 
                    }}
                  >
                    <Text style={styles.optionText}>Task</Text>
                    <Icon name="settings" size={20} color="#2B2162" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2162',
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  popoverContainer: {
    alignItems: 'center',
    marginBottom: 80, // adjust as needed to lift the popover above the button
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
  },
  popoverContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 160,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2B2162',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
});
