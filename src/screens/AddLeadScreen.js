import React, { useState, useEffect } from 'react';
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
import {
  fetchLeadDropdownData,
  fetchCountries,
  fetchStatesByCountryId,
  fetchCitiesByStateId,
  createupdatelead,
} from '../services/common-services';

export default function AddLeadScreen({ navigation }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
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
    companyName: '',
    jobTitle: '',
    experience: '',
    income: '',
    assignTo: '',
    service: '',
    remark: '',
  });

  const [errors, setErrors] = useState({});
  const [servicesList, setServicesList] = useState([]);

  // --- ✅ NEW STATE FOR DYNAMIC DROPDOWN VALUES
  const [leadSources, setLeadSources] = useState([]);
  const [leadSourceOptions, setLeadSourceOptions] = useState([]);
  // --- ✅ COUNTRY / STATE / CITY STATES ---
  const [countriesList, setCountriesList] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  const [statesList, setStatesList] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  const [citiesList, setCitiesList] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const [occupation, setOccupation] = useState([]);
  const [occupationOptions, setOccupationOptions] = useState([]);

  // --- For Services Dropdown from API ---
  const [servicesListApi, setServicesListApi] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);

  const [assignToList, setAssignToList] = useState([]);
  const [assignToOptions, setAssignToOptions] = useState([]);

  useEffect(() => {
    const loadAllDropdowns = async () => {
      try {
        const { leadSources, occupations, services, assignedTo } =
          await fetchLeadDropdownData();

        console.log('Lead Dropdown Data:', {
          leadSources,
          occupations,
          services,
          assignedTo,
        });

        // --- Lead Source ---
        setLeadSources(leadSources);
        setLeadSourceOptions(leadSources.map(item => item?.value || ''));

        // --- Occupation ---
        setOccupation(occupations);
        setOccupationOptions(occupations.map(item => item?.value || ''));

        // --- Services ---
        setServicesListApi(services);
        setServiceOptions(services.map(item => item?.value || ''));

        // --- Assign To ---
        setAssignToList(assignedTo);
        setAssignToOptions(assignedTo.map(item => item?.value || ''));
      } catch (error) {
        console.error('Error fetching dropdowns:', error);
      }
    };

    loadAllDropdowns();
  }, []);

  // --- Load Countries Initially ---
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetchCountries();
        console.log('Countries API Response:', response);
        const data = Array.isArray(response)
          ? response
          : response.data || response.result || [];
        setCountriesList(data);
        setCountryOptions(data.map(c => c.countryName || c.name));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    loadCountries();
  }, []);

  // --- Load States when Country changes ---
  useEffect(() => {
    const loadStates = async () => {
      if (!formData.country) return;
      try {
        const selectedCountry = countriesList.find(
          c => c.countryName === formData.country,
        );
        const response = await fetchStatesByCountryId(
          selectedCountry?.countryId,
        );
        console.log('States API Response:', response);
        const data = Array.isArray(response)
          ? response
          : response.data || response.result || [];
        setStatesList(data);
        setStateOptions(data.map(s => s.stateName || s.name));
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    loadStates();
  }, [formData.country]);

  // --- Load Cities when State changes ---
  useEffect(() => {
    const loadCities = async () => {
      if (!formData.state) return;
      try {
        const selectedState = statesList.find(
          s => s.stateName === formData.state,
        );
        const response = await fetchCitiesByStateId(selectedState?.stateId);
        console.log('Cities API Response:', response);
        const data = Array.isArray(response)
          ? response
          : response.data || response.result || [];
        setCitiesList(data);
        setCityOptions(data.map(c => c.cityName || c.name));
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    loadCities();
  }, [formData.state]);

  // --- COMMON HANDLERS
  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.mobileNo) newErrors.mobileNo = 'Mobile No is required';
    if (!formData.email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.experience) newErrors.experience = 'Type of work is required';
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

  console.log('formdata', formData);
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                if (step === 1) navigation.navigate('LeadMain');
                else setStep(step - 1);
              }}
            >
              <Feather name="arrow-left" size={22} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Lead</Text>
            <View style={{ width: 22 }} />
          </View>

          {/* STEP INDICATOR */}
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

          {/* STEP 1 */}
          {step === 1 && (
            <ScrollView contentContainerStyle={styles.formContainer}>
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

              {/* ✅ UPDATED LEAD SOURCE DROPDOWN */}
              <View style={styles.inputWrapper}>
                {formData.leadSource ? (
                  <Text style={styles.floatingLabel}>Lead Source</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={leadSourceOptions} // 🟢 this is string array
                    defaultValue={formData.leadSource || 'Lead Source'}
                    onSelect={(index, option) => {
                      const selectedObj = leadSources[index]; // 🟡 get the full object
                      console.log('Selected Lead Source Object:', selectedObj);
                      handleChange('leadSource', selectedObj); // save whole object if needed
                    }}
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

              {/* --- COUNTRY DROPDOWN --- */}
              <View style={styles.inputWrapper}>
                {formData.country ? (
                  <Text style={styles.floatingLabel}>Country</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={countryOptions}
                    defaultValue={
                      formData.country?.countryName || 'Select Country'
                    }
                    onSelect={(index, option) => {
                      const selectedObj = countriesList[index];
                      handleChange('country', selectedObj); // save full object
                      handleChange('state', ''); // clear state
                      handleChange('city', ''); // clear city
                    }}
                  />

                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.country && (
                  <Text style={styles.errorText}>{errors.country}</Text>
                )}
              </View>

              {/* --- STATE DROPDOWN --- */}
              <View style={styles.inputWrapper}>
                {formData.state ? (
                  <Text style={styles.floatingLabel}>State</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={stateOptions}
                    defaultValue={formData.state?.stateName || 'Select State'}
                    onSelect={(index, option) => {
                      const selectedObj = statesList[index];
                      handleChange('state', selectedObj); // save full object
                      handleChange('city', ''); // clear city
                    }}
                  />

                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.state && (
                  <Text style={styles.errorText}>{errors.state}</Text>
                )}
              </View>

              {/* --- CITY DROPDOWN --- */}
              <View style={styles.inputWrapper}>
                {formData.city ? (
                  <Text style={styles.floatingLabel}>City</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={cityOptions}
                    defaultValue={formData.city?.cityName || 'Select City'}
                    onSelect={(index, option) => {
                      const selectedObj = citiesList[index];
                      handleChange('city', selectedObj); // save full object
                    }}
                  />

                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.city && (
                  <Text style={styles.errorText}>{errors.city}</Text>
                )}
              </View>

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
              {renderInput({
                label: 'Pincode',
                value: formData.pincode,
                onChangeText: v => handleChange('pincode', v),
                errorKey: 'pincode',
              })}

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

              {/* Next Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  const valid = validateStep1();
                  console.log('Step 1 validation result:', valid);
                  if (valid) setStep(2);
                }}
              >
                <Text style={styles.submitButtonText}>Next</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {/* STEP 2 - OCCUPATION DETAILS */}
          {step === 2 && (
            <ScrollView contentContainerStyle={styles.formContainer}>
              <View style={styles.inputWrapper}>
                {formData.occupation ? (
                  <Text style={styles.floatingLabel}>Occupation</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={occupationOptions}
                    defaultValue={
                      formData.occupation?.value || 'Select Occupation'
                    }
                    onSelect={(index, option) => {
                      const selectedObj = occupation[index];
                      handleChange('occupation', selectedObj); // save full object
                    }}
                  />

                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.occupation && (
                  <Text style={styles.errorText}>{errors.occupation}</Text>
                )}
              </View>

              {renderInput({
                label: 'Type Of Work ',
                value: formData.experience,
                onChangeText: v => handleChange('experience', v),
                errorKey: 'experience',
              })}
              {renderInput({
                label: 'Monthly Income',
                value: formData.income,
                onChangeText: v => handleChange('income', v),
                errorKey: 'income',
              })}

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.submitButton, { backgroundColor: '#ccc' }]}
                  onPress={() => setStep(1)}
                >
                  <Text style={styles.submitButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => validateStep2() && setStep(3)}
                >
                  <Text style={styles.submitButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}

          {/* STEP 3 - SERVICES DETAILS */}
          {step === 3 && (
            <ScrollView contentContainerStyle={styles.formContainer}>
              {/* Assign To Dropdown */}
              <View style={styles.inputWrapper}>
                {formData.assignTo ? (
                  <Text style={styles.floatingLabel}>Assign To</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={assignToOptions}
                    defaultValue={formData.assignTo?.value || 'Select User'}
                    onSelect={(index, option) => {
                      const selectedObj = assignToList[index];
                      handleChange('assignTo', selectedObj); // save full object
                    }}
                  />

                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.assignTo && (
                  <Text style={styles.errorText}>{errors.assignTo}</Text>
                )}
              </View>

              {/* --- SERVICE DROPDOWN --- */}
              <View style={styles.inputWrapper}>
                {formData.service ? (
                  <Text style={styles.floatingLabel}>Service</Text>
                ) : null}
                <View style={styles.inputRow}>
                  <ModalDropdown
                    options={serviceOptions}
                    defaultValue={formData.service?.value || 'Select Service'}
                    onSelect={(index, option) => {
                      const selectedObj = servicesListApi[index];
                      handleChange('service', selectedObj); // save full object
                    }}
                  />

                  <Feather name="chevron-down" size={18} color="#999" />
                </View>
                {errors.service && (
                  <Text style={styles.errorText}>{errors.service}</Text>
                )}
              </View>

              {/* --- REMARK INPUT --- */}
              {renderInput({
                label: 'Remark',
                value: formData.remark,
                onChangeText: v => handleChange('remark', v),
                errorKey: 'remark',
              })}

              {/* --- ADD SERVICE BUTTON --- */}
              <TouchableOpacity
                style={[styles.submitButton, { marginBottom: 10 }]}
                onPress={() => {
                  if (formData.service && formData.remark) {
                    setServicesList(prev => [
                      ...prev,
                      {
                        serviceId: formData.service.key, // API ID
                        serviceName:
                          formData.service.value01 || formData.service.value,
                        remark: formData.remark,
                        date: new Date().toLocaleDateString('en-GB'),
                      },
                    ]);

                    handleChange('service', ''); // clear dropdown
                    handleChange('remark', ''); // clear remark
                  } else {
                    alert('Please select service and add remark.');
                  }
                }}
              >
                <Text style={styles.submitButtonText}>Add Service</Text>
              </TouchableOpacity>

              {/* --- SHOW ADDED SERVICES BELOW --- */}
              {servicesList.length > 0 && (
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                    Added Services:
                  </Text>
                  {servicesList.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#f5f5f5',
                        padding: 10,
                        borderRadius: 8,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={{ fontWeight: '600' }}>
                        {index + 1}. {item.service}
                      </Text>
                      <Text style={{ color: '#555' }}>
                        Remark: {item.remark}
                      </Text>
                      <Text style={{ color: '#888', fontSize: 12 }}>
                        Date: {item.date}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* --- SUBMIT BUTTON AT BOTTOM --- */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.submitButton, { backgroundColor: '#ccc' }]}
                  onPress={() => setStep(2)}
                >
                  <Text style={styles.submitButtonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={async () => {
                    try {
                      if (servicesList.length === 0) {
                        alert('Please add at least one service.');
                        return;
                      }

                      const payload = {
                        id: 0,
                        tenantId: '',
                        customerId: 0,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        emailId: formData.email,
                        mobileNo: formData.mobileNo,
                        whatsAppNo: formData.whatsappNo,
                        addressLine1: formData.addressLine1,
                        addressLine2: formData.addressLine2,
                        cityId: formData.city?.cityId || 0,
                        cityName: formData.city?.cityName || '',
                        stateId: formData.state?.stateId || 0,
                        stateName: formData.state?.stateName || '',
                        countryId: formData.country?.countryId || 0,
                        countryName: formData.country?.countryName || '',
                        pincode: parseInt(formData.pincode) || 0,
                        leadSource: formData.leadSource?.key || 0,
                        leadSourceName:
                          formData.leadSource?.value01 ||
                          formData.leadSource?.value ||
                          '',
                        occupation: formData.occupation?.key || 0,
                        occupationName:
                          formData.occupation?.value01 ||
                          formData.occupation?.value ||
                          '',
                        organisationName: formData.companyName,
                        workType: formData.experience,
                        monthlyIncome: parseInt(formData.income) || 0,
                        assignedTo: formData.assignTo?.key || 0,
                        assignedToName:
                          formData.assignTo?.value01 ||
                          formData.assignTo?.value ||
                          '',
                        leadStatus: 0,
                        leadStatusName: '',
                        createdBy: 0,
                        createdByName: '',
                        leadDate: new Date().toISOString(),
                        isActive: true,
                        serviceDetails: servicesList.map(s => ({
                          id: 0,
                          customerId: 0,
                          serviceId: s.serviceId || 0,
                          serviceName: s.serviceName,
                          leadId: 0,
                          clientId: 0,
                          isExistingClient: true,
                          remark: s.remark,
                          assignedTo: formData.assignTo?.key || 0,
                          assignedToName:
                            formData.assignTo?.value01 ||
                            formData.assignTo?.value ||
                            '',
                          isActive: true,
                        })),
                      };

                      console.log('Submitting lead payload:', payload);

                      const status = await createupdatelead(payload);
                      if (status === 200) {
                        alert('Lead added successfully!');
                        navigation.navigate('LeadMain');
                      } else {
                        alert('Failed to add lead. Please try again.');
                      }
                    } catch (error) {
                      console.error('Error adding lead:', error);
                      alert('Something went wrong!');
                    }
                  }}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
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
