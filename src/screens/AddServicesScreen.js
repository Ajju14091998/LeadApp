import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ModalDropdown from 'react-native-modal-dropdown';

export default function AddServicesScreen({ navigation }) {
  const [selectedService, setSelectedService] = useState('');
  const [remark, setRemark] = useState('');
  const [errors, setErrors] = useState({});

  const serviceOptions = [
    'Insurance',
    'Mutual Fund',
    'Loan',
    'Fixed Deposit',
    'Gold Investment',
  ];

  const [services, setServices] = useState([
    {
      id: '1',
      title: 'Insurance',
      date: '20-01-2025',
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type...",
    },
    {
      id: '2',
      title: 'Mutual Fund',
      date: '20-01-2025',
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type...",
    },
  ]);

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((item) => item.id !== id));
  };

  const validateAndSubmit = () => {
    const newErrors = {};
    if (!selectedService) newErrors.service = 'Service is required';
    if (!remark) newErrors.remark = 'Remark is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully');
      // Here you can proceed with API submission
    }
  };

  const renderInput = ({
    label,
    value,
    onChangeText,
    isMultiline = false,
    errorKey,
  }) => (
    <View style={styles.inputWrapper}>
      {value ? <Text style={styles.floatingLabel}>{label}</Text> : null}
      <View
        style={[
          styles.inputRow,
          isMultiline && {
            height: 100,
            alignItems: 'flex-start',
            paddingTop: 10,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            isMultiline && { height: '100%', textAlignVertical: 'top' },
          ]}
          placeholder={!value ? label : ''}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          multiline={isMultiline}
        />
      </View>
      {errors[errorKey] && (
        <Text style={styles.errorText}>{errors[errorKey]}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Feather name="arrow-left" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Services</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.formContainer}>
        {/* Services Dropdown */}
        <View style={styles.inputWrapper}>
          {selectedService ? (
            <Text style={styles.floatingLabel}>Services</Text>
          ) : null}
          <View style={styles.inputRow}>
            <ModalDropdown
              options={serviceOptions}
              defaultValue={selectedService || 'Services'}
              onSelect={(index, option) => setSelectedService(option)}
              textStyle={styles.dropdownText}
              dropdownTextStyle={styles.dropdownItemText}
              dropdownStyle={styles.dropdownStyle}
              style={{ flex: 1 }}
            />
            <Feather name="chevron-down" size={18} color="#999" />
          </View>
          {errors.service && (
            <Text style={styles.errorText}>{errors.service}</Text>
          )}
        </View>

        {/* Remark */}
        {renderInput({
          label: 'Remark',
          value: remark,
          onChangeText: setRemark,
          isMultiline: true,
          errorKey: 'remark',
        })}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Services List */}
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          renderItem={({ item }) => (
            <View style={styles.serviceCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceTitle}>{item.title}</Text>
                <Text style={styles.serviceDate}>{item.date}</Text>
                <Text style={styles.serviceDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Feather name="trash-2" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    color: '#212121',
  },
  formContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 16,
    position: 'relative',
  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#2B2162',
    zIndex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Urbanist-Regular',
  },
  dropdownText: {
    fontSize: 15,
    color: '#000',
    paddingVertical: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    padding: 10,
  },
  dropdownStyle: {
    width: '88%',
    marginLeft: 0,
    height: 150,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#2B2162',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  serviceCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Urbanist-Bold',
    marginBottom: 4,
  },
  serviceDate: {
    fontSize: 12,
    color: '#424242',
    fontFamily: 'Urbanist-Regular',
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#424242',
    fontFamily: 'Urbanist-Regular',
    lineHeight: 18,
  },
});
