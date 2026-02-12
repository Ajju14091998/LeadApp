import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setLogoutVisible(true)}
          >
            <Icon name="log-out" size={20} color="red" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="edit-2" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Name */}
        <Text style={styles.name}>Daniel Austin</Text>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>daniel_austin@gmail.com</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>+91 9876543210</Text>

          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>Male</Text>

          <Text style={styles.label}>DOB</Text>
          <Text style={styles.value}>01 / 01 / 1992</Text>
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutVisible}
        onRequestClose={() => setLogoutVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setLogoutVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Logout</Text>
                <Text style={styles.modalText}>
                  Are you sure you want to log out?
                </Text>

                <TouchableOpacity
                  style={styles.logoutConfirmBtn}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutConfirmText}>Yes, Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setLogoutVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoutText: {
    fontSize: 18,
    color: '#F75555',
    fontWeight: '600',
    fontFamily: 'Urbanist-Bold',
  },
  profileImageWrapper: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2B2162',
    borderRadius: 12,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Urbanist-Bold',
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
    fontFamily: 'Urbanist-Medium',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 10,
    fontFamily: 'Urbanist-Bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F75555',
    textAlign: 'center',
    fontFamily: 'Urbanist-Bold',
    lineHeight: 28.8,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#424242',
    textAlign: 'center',
    fontFamily: 'Urbanist-Bold',
    lineHeight: 24,
    marginBottom: 24,
  },

  logoutConfirmBtn: {
    width: '100%',
    height: 55,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#2B2162',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },

  logoutConfirmText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Urbanist-Bold',
  },

  cancelBtn: {
    width: '100%',
    height: 55,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#DFE4FF', // Primary-100
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B2162',
    textAlign: 'center',
    fontFamily: 'Urbanist-Bold',
  },
});
