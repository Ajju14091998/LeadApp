import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ModalDropdown from 'react-native-modal-dropdown';

export default function AddLeadScreen({ navigation }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    leadSource: '',
    mobileNo: '',
    email: '',
    whatsappNo: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    // Step 2
    companyName: '',
    jobTitle: '',
    experience: '',
    income: '',
    // Step 3
    assignTo: '',
    service: '',
    remark: '',
  });

  const [errors, setErrors] = useState({});
  const [servicesList, setServicesList] = useState([]);

  // Dropdown options
  const leadSources = ['Referral', 'Website', 'Cold Call', 'Event'];
  const cities = ['Pune', 'Mumbai', 'Nagpur'];
  const states = ['Maharashtra', 'Gujarat', 'Karnataka'];
  const countries = ['India', 'USA', 'UK'];
  const assignUsers = ['User A', 'User B', 'User C'];
  const services = ['Mutual Fund', 'Insurance', 'Loan'];

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.leadSource) newErrors.leadSource = 'Lead Source is required';
    if (!formData.mobileNo) newErrors.mobileNo = 'Mobile No is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.whatsappNo) newErrors.whatsappNo = 'Whatsapp No is required';
    if (!formData.addressLine1)
      newErrors.addressLine1 = 'Address Line 1 is required';
    if (!formData.addressLine2)
      newErrors.addressLine2 = 'Address Line 2 is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = 'Company is required';
    if (!formData.jobTitle) newErrors.jobTitle = 'Job Title is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.income) newErrors.income = 'Income is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderInput = ({ label, value, onChangeText, errorKey }) => (
    <View style={styles.inputWrapper}>
      {value ? <Text style={styles.floatingLabel}>{label}</Text> : null}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={!value ? label : ''}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {errors[errorKey] && (
        <Text style={styles.errorText}>{errors[errorKey]}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                if (step === 1) {
                  navigation.navigate('LeadMain'); 
                } else {
                  setStep(step - 1);
                }
              }}
            >
              <Feather name="arrow-left" size={22} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Lead</Text>
            <View style={{ width: 22 }} />
          </View>

          {/* Step Indicator */}
          <View style={styles.stepIndicator}>
            {[1, 2, 3].map(i => (
              <React.Fragment key={i}>
                <View
                  style={i === step ? styles.stepItemActive : styles.stepItem}
                >
                  <Text
                    style={
                      i === step ? styles.stepNumberActive : styles.stepNumber
                    }
                  >
                    {i}
                  </Text>
                  <Text
                    style={i === step ? styles.stepTextActive : styles.stepText}
                  >
                    {i === 1 ? 'Personal' : i === 2 ? 'Occupation' : 'Services'}
                  </Text>
                </View>
                {i < 3 && <View style={styles.stepDivider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Step 1 */}
          {step === 1 && (
            <ScrollView
              contentContainerStyle={styles.formContainer}
              keyboardShouldPersistTaps="handled"
            >
              {renderInput({
                label: 'First Name',
                value: formData.firstName,
                onChangeText: v => handleChange('firstName', v),
                errorKey: 'firstName',
              })}
              {renderInput({
                label: 'Last Name',
                value: formData.lastName,
                onChangeText: v => handleChange('lastName', v),
                errorKey: 'lastName',
              })}

              {/* Lead Source Dropdown */}
              <View style={styles.inputWrapper}>
                {formData.leadSource ? (
                  <Text style={styles.floatingLabel}>Lead Source</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={leadSources}
                    defaultValue={formData.leadSource || 'Lead Source'}
                    onSelect={(i, option) => handleChange('leadSource', option)}
                    textStyle={styles.dropdownText}
                    dropdownTextStyle={styles.dropdownItemText}
                    dropdownStyle={styles.dropdownStyle}
                    style={{ flex: 1 }}
                  />
                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.leadSource && (
                  <Text style={styles.errorText}>{errors.leadSource}</Text>
                )}
              </View>

              {renderInput({
                label: 'Mobile No',
                value: formData.mobileNo,
                onChangeText: v => handleChange('mobileNo', v),
                errorKey: 'mobileNo',
              })}
              {renderInput({
                label: 'Email Id',
                value: formData.email,
                onChangeText: v => handleChange('email', v),
                errorKey: 'email',
              })}
              {renderInput({
                label: 'Whatsapp No',
                value: formData.whatsappNo,
                onChangeText: v => handleChange('whatsappNo', v),
                errorKey: 'whatsappNo',
              })}
              {renderInput({
                label: 'Address Line 1',
                value: formData.addressLine1,
                onChangeText: v => handleChange('addressLine1', v),
                errorKey: 'addressLine1',
              })}
              {renderInput({
                label: 'Address Line 2',
                value: formData.addressLine2,
                onChangeText: v => handleChange('addressLine2', v),
                errorKey: 'addressLine2',
              })}

              {/* City Dropdown */}
              <View style={styles.inputWrapper}>
                {formData.city ? (
                  <Text style={styles.floatingLabel}>City</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={cities}
                    defaultValue={formData.city || 'City'}
                    onSelect={(i, option) => handleChange('city', option)}
                    textStyle={styles.dropdownText}
                    dropdownTextStyle={styles.dropdownItemText}
                    dropdownStyle={styles.dropdownStyle}
                    style={{ flex: 1 }}
                  />
                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.city && (
                  <Text style={styles.errorText}>{errors.city}</Text>
                )}
              </View>

              {/* State Dropdown */}
              <View style={styles.inputWrapper}>
                {formData.state ? (
                  <Text style={styles.floatingLabel}>State</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={states}
                    defaultValue={formData.state || 'State'}
                    onSelect={(i, option) => handleChange('state', option)}
                    textStyle={styles.dropdownText}
                    dropdownTextStyle={styles.dropdownItemText}
                    dropdownStyle={styles.dropdownStyle}
                    style={{ flex: 1 }}
                  />
                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.state && (
                  <Text style={styles.errorText}>{errors.state}</Text>
                )}
              </View>

              {/* Country Dropdown */}
              <View style={styles.inputWrapper}>
                {formData.country ? (
                  <Text style={styles.floatingLabel}>Country</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={countries}
                    defaultValue={formData.country || 'Country'}
                    onSelect={(i, option) => handleChange('country', option)}
                    textStyle={styles.dropdownText}
                    dropdownTextStyle={styles.dropdownItemText}
                    dropdownStyle={styles.dropdownStyle}
                    style={{ flex: 1 }}
                  />
                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.country && (
                  <Text style={styles.errorText}>{errors.country}</Text>
                )}
              </View>

              {renderInput({
                label: 'Pincode',
                value: formData.pincode,
                onChangeText: v => handleChange('pincode', v),
                errorKey: 'pincode',
              })}

              {/* Next Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => validateStep1() && setStep(2)}
              >
                <Text style={styles.submitButtonText}>Next</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
          {/* Step 2 */}
          {step === 2 && (
            <ScrollView
              contentContainerStyle={styles.formContainer}
              keyboardShouldPersistTaps="handled"
            >
              {/* Occupation Dropdown */}
              <View style={styles.inputWrapper}>
                {formData.occupation ? (
                  <Text style={styles.floatingLabel}>Occupation</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={['Salaried', 'Business', 'Self-employed']}
                    defaultValue={formData.occupation || 'Occupation'}
                    onSelect={(i, option) => handleChange('occupation', option)}
                    textStyle={styles.dropdownText}
                    dropdownTextStyle={styles.dropdownItemText}
                    dropdownStyle={styles.dropdownStyle}
                    style={{ flex: 1 }}
                  />
                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.occupation && (
                  <Text style={styles.errorText}>{errors.occupation}</Text>
                )}
              </View>

              {/* Type of Work */}
              {renderInput({
                label: 'Type of Work',
                value: formData.typeOfWork,
                onChangeText: v => handleChange('typeOfWork', v),
                errorKey: 'typeOfWork',
              })}

              {/* Monthly Income */}
              {renderInput({
                label: 'Monthly Income',
                value: formData.income,
                onChangeText: v => handleChange('income', v),
                errorKey: 'income',
              })}

              {/* Next Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  const newErrors = {};
                  if (!formData.occupation)
                    newErrors.occupation = 'Occupation is required';
                  if (!formData.typeOfWork)
                    newErrors.typeOfWork = 'Type of Work is required';
                  if (!formData.income)
                    newErrors.income = 'Monthly Income is required';
                  setErrors(newErrors);

                  if (Object.keys(newErrors).length === 0) {
                    setStep(3);
                  }
                }}
              >
                <Text style={styles.submitButtonText}>Next</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <ScrollView
              contentContainerStyle={styles.formContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.inputWrapper}>
                {formData.assignTo ? (
                  <Text style={styles.floatingLabel}>Assign To</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={assignUsers}
                    defaultValue={formData.assignTo || 'Assign To'}
                    onSelect={(i, option) => handleChange('assignTo', option)}
                    textStyle={styles.dropdownText}
                    dropdownTextStyle={styles.dropdownItemText}
                    dropdownStyle={styles.dropdownStyle}
                    style={{ flex: 1 }}
                  />
                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                {formData.service ? (
                  <Text style={styles.floatingLabel}>Service</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={services}
                    defaultValue={formData.service || 'Service'}
                    onSelect={(i, option) => handleChange('service', option)}
                    textStyle={styles.dropdownText}
                    dropdownTextStyle={styles.dropdownItemText}
                    dropdownStyle={styles.dropdownStyle}
                    style={{ flex: 1 }}
                  />
                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
              </View>
              {renderInput({
                label: 'Remark',
                value: formData.remark,
                onChangeText: v => handleChange('remark', v),
              })}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  if (!formData.service) return;
                  setServicesList(prev => [
                    ...prev,
                    {
                      name: formData.service,
                      remark: formData.remark || '',
                      date: new Date().toLocaleDateString(),
                    },
                  ]);
                  handleChange('service', '');
                  handleChange('remark', '');
                }}
              >
                <Text style={styles.submitButtonText}>Add</Text>
              </TouchableOpacity>

              {servicesList.map((s, index) => (
                <View key={index} style={styles.serviceCard}>
                  <Text style={styles.serviceTitle}>{s.name}</Text>
                  <Text style={styles.serviceDate}>{s.date}</Text>
                  <Text style={styles.serviceRemark}>{s.remark}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// styles remain same as before

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  stepItemActive: { alignItems: 'center' },
  stepItem: { alignItems: 'center' },
  stepNumberActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2B2162',
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 24,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    color: '#000',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 24,
  },
  stepTextActive: {
    fontSize: 12,
    color: '#2B2162',
    marginTop: 4,
  },
  stepText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  stepDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  formContainer: { padding: 16 },
  inputWrapper: { marginBottom: 16, position: 'relative' },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#2B2162',
    zIndex: 2,
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
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
  submitButton: {
    backgroundColor: '#2B2162',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
