// screens/ClientFollowUpScreen.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CustomeFollowup from '../components/CustomeFolloup';

export default function ClientFollowUp({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Follow-up</Text>
        <View style={{ width: 22 }} />
      </View>

      <CustomeFollowup
        navigation={navigation}
        statusOptions={['Pending', 'Resolved', 'Escalated', 'Closed']}
        assignOptions={['Rohit Sharma', 'Pooja S.', 'Ajay Dev', 'Komal P.']}
        onSubmit={(data) => {
          console.log('Client Follow-up Data:', data);
        }}
        history={[
          {
            heading: 'Service Request Follow-up',
            status: 'Resolved',
            person: 'Mr. Jadhav',
            date: '05-07-2025 4:30 PM',
            description: 'Resolved client’s login issue.',
            attachment: 'SupportLog.jpg',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginTop: 40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
